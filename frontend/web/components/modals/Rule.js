import React, { PureComponent } from 'react';
import Constants from 'common/constants';
import cloneDeep from 'lodash/cloneDeep';

const splitIfValue = (v, append) => (append ? v.split(append) : [v === null ? '' : v]);

export default class Rule extends PureComponent {
    static displayName = 'Rule';

    static propTypes = {};

    renderRule = (rule, i) => {
        const { props: { operators, rule: { conditions: rules } } } = this;
        const isLastRule = i === (rules.length - 1);
        const hasOr = i > 0;
        const operatorObj = Utils.findOperator(rule.operator, rule.value, operators);
        const operator = operatorObj && operatorObj.value;
        const value = typeof rule.value === 'string' ? rule.value.replace((operatorObj && operatorObj.append) || '', '') : rule.value;

        if (rule.delete) {
            return null
        }

        const valuePlaceholder = rule.hideValue ? 'Value (N/A)' : rule.valuePlaceholder || 'Value';
        return (
            <div className="rule__row reveal" key={i}>
                {hasOr && (
                    <Row className="or-divider">
                        <Row>
                            <div className="or-divider__up"/>
                            Or
                            <div className="or-divider__down"/>
                        </Row>
                        <Flex className="or-divider__line"/>
                    </Row>
                )}
                <Row noWrap className="rule">
                    <Flex>
                        <Row>
                            <Flex value={20} className="px-1">
                                <Tooltip
                                  title={(
                                      <Input
                                        readOnly={this.props.readOnly}
                                        data-test={`${this.props['data-test']}-property-${i}`}
                                        className="input-container full-width"
                                        value={`${rule.property}`}
                                        placeholder={operator && operator === 'PERCENTAGE_SPLIT' ? 'Trait (N/A)' : 'Trait *'}
                                        onChange={e => this.setRuleProperty(i, 'property', { value: Utils.safeParseEventValue(e) })}
                                        disabled={operator && operator === 'PERCENTAGE_SPLIT'}
                                      />
                                    )}
                                  place="top"
                                >
                                    {Constants.strings.USER_PROPERTY_DESCRIPTION}
                                </Tooltip>
                            </Flex>
                            <Flex value={30} className="px-1 text-center">
                                {this.props.readOnly ? _.find(operators, { value: operator }).label : (
                                    <Select
                                      data-test={`${this.props['data-test']}-operator-${i}`}
                                      value={operator && _.find(operators, { value: operator })}
                                      onChange={value => this.setRuleProperty(i, 'operator', value)}
                                      options={operators}
                                    />
                                )}
                            </Flex>
                            <Flex value={15} className="px-1">
                                <Input
                                  readOnly={this.props.readOnly}
                                  data-test={`${this.props['data-test']}-value-${i}`}
                                  className="input-container--flat full-width"
                                  value={value || ''}
                                  placeholder={valuePlaceholder}
                                  disabled={operatorObj && operatorObj.hideValue}
                                  onChange={(e) => {
                                      const value = Utils.getTypedValue(Utils.safeParseEventValue(e));
                                      this.setRuleProperty(i, 'value', { value: operatorObj && operatorObj.append ? `${value}${operatorObj.append}` : value }, true);
                                  }}
                                  isValid={Utils.validateRule(rule)}
                                />
                            </Flex>
                        </Row>
                        {this.props.showDescription && (
                            <Row noWrap className="rule">
                                <textarea
                                    readOnly={this.props.readOnly}
                                    data-test={`${this.props['data-test']}-description-${i}`}
                                    className="full-width borderless"
                                    value={`${rule.description||""}`}
                                    placeholder= "Condition description (Optional)"
                                    onChange={(e) => {
                                        const value = Utils.safeParseEventValue(e);
                                        this.setRuleProperty(i, 'description', {value}, true);
                                    }}
                                />
                            </Row>
                        )}

                    </Flex>
                    <div>
                        <Row noWrap>
                            {isLastRule && !this.props.readOnly ? (
                                <ButtonOutline
                                    className="ml-2"
                                  data-test={`${this.props['data-test']}-or`}
                                  type="button" onClick={this.addRule}

                                >
                                    Or
                                </ButtonOutline>
                            ) : (
                                <div style={{ width: 64 }} />
                            )}

                            <div>
                                <button
                                  data-test={`${this.props['data-test']}-remove`}
                                  type="button"
                                  id="remove-feature"
                                  onClick={() => this.removeRule(i)}
                                  className="btn btn--with-icon btn--condensed reveal--child btn--remove"
                                >
                                    <RemoveIcon/>
                                </button>
                            </div>
                        </Row>
                    </div>
                </Row>
            </div>
        );
    }
    removeRule = (i) => {
        this.setRuleProperty(i, "delete", {value:true})
    }

    setRuleProperty = (i, prop, { value }) => {
        const rule = cloneDeep(this.props.rule);

        const { conditions: rules   } = rule;

        const prevOperator = Utils.findOperator(rules[i].operator, rules[i].value, this.props.operators);
        const newOperator = prop !== 'operator' ? prevOperator : this.props.operators.find(v => v.value === value);

        if (newOperator && newOperator.hideValue) {
            rules[i].value = null;
        }
        if ((prevOperator && prevOperator.append) !== (newOperator && newOperator.append)) {
            rules[i].value = splitIfValue(rules[i].value, prevOperator && prevOperator.append)[0] + (newOperator.append || '');
        }

        // remove append if one was added


        const formattedValue = value === null ? null : `${value}`;
        const invalidPercentageSplit = prop === "value" && rules[i].operator === "PERCENTAGE_SPLIT" && (`${value}`?.match(/\D/) || value > 100);
        if (!invalidPercentageSplit) {
            // split operator by append
            rules[i][prop] = prop === 'operator' ? formattedValue.split(':')[0] : formattedValue;
        }

        if (prop === 'operator' && value === 'PERCENTAGE_SPLIT') {
            rules[i].property = '';
            rules[i].value = '';
        }

        if(!rule.conditions.filter((condition)=>!condition.delete).length) {
            rule.delete = true
        }

        if(!rule.conditions.filter((condition)=>!condition.delete).length) {
            rule.delete = true
        }

        this.props.onChange(rule);
    }

    addRule = () => {
        const { props: { rule: { conditions: rules } } } = this;
        this.props.onChange({
            ...this.props.rule,
            conditions: rules.concat([{ ...Constants.defaultRule }])
        });
    };


    render() {
        const { props: { rule: { conditions: rules } } } = this;
        return (
            <div>
                <div className="panel panel-without-heading overflow-visible">
                    <div className="panel-content">
                        {rules.map(this.renderRule)}
                    </div>
                </div>
            </div>
        );
    }
}
