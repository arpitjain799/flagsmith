// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

export default class Paging extends PureComponent {
    static displayName = 'Paging';

    static propTypes = {
        paging: propTypes.object,
        onPreviousClick: propTypes.func,
        onNextClick: propTypes.func,
        goToPage: propTypes.func,
        isLoading: propTypes.bool,
    };

    render() {
        const { props: {
            paging,
            isLoading,
            goToPage,
            nextPage,
            prevPage,
        } } = this;
        const currentIndex = paging.currentPage - 1;
        const lastPage = Math.ceil(paging.count / paging.pageSize);
        const spaceBetween = 2;
        // const numberOfPages = Math.ceil(paging.count / paging.pageSize);
        const from = Math.max(0, (currentIndex + 1) - spaceBetween);
        const to = Math.min(lastPage, (currentIndex || currentIndex + 1) + spaceBetween);
        const range = _.range(from, to);
        const noPages = range.length < 2;
        if (noPages && !(paging.next || paging.previous)) {
            return <div/>;
        }
        return (
            <Row className="list-item paging py-0" style={isLoading ? { opacity: 0.5 } : {}}>
                <Button
                  disabled={isLoading || !paging.previous} className="icon btn-paging ion-ios-arrow-back"
                  onClick={() => prevPage()}
                />
                {!!paging.currentPage ? (
                    <Row className="list-item">
                        {!range.includes(0) && !noPages && (
                            <>
                                <div
                                    role="button"
                                    className={cn({
                                        page: true,
                                        'active': currentIndex === 1,
                                    })}
                                    onClick={paging.currentPage === 1 + 1 ? undefined : () => goToPage(1)}
                                >
                                    {1}
                                </div>
                                <div
                                    className={cn({
                                        page: true,
                                    })}
                                >
                                    ...
                                </div>
                            </>
                        )}
                        {!noPages && _.map(range, index => (
                            <div
                                key={index} role="button"
                                className={cn({
                                    page: true,
                                    'active': currentIndex === index,
                                })}
                                onClick={paging.currentPage === index + 1 ? undefined : () => goToPage(index + 1)}
                            >
                                {index + 1}
                            </div>
                        ))}
                        {!noPages && !range.includes(lastPage - 1) && (
                            <>

                                <div
                                    className={cn({
                                        page: true,
                                    })}
                                    onClick={paging.currentPage === lastPage + 1 ? undefined : () => goToPage(1)}
                                >
                                    ...
                                </div>
                                <div
                                    role="button"
                                    className={cn({
                                        page: true,
                                        'active': currentIndex === lastPage,
                                    })}
                                    onClick={paging.currentPage === lastPage ? undefined : () => goToPage(lastPage)}
                                >
                                    {lastPage}
                                </div>
                            </>
                        )}
                    </Row>
                ): !!paging.page && <span>Page {paging.page}{paging.pageSize&&paging.count ? (
                    ` of ${Math.ceil(paging.count/paging.pageSize)}`
                ):""}</span>}
                <Button
                  className="icon btn-paging ion-ios-arrow-forward" disabled={isLoading || !paging.next}
                  onClick={() => nextPage()}
                />
            </Row>
        );
    }
}
