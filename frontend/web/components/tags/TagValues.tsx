import React, {FC} from 'react'
import Button from "../base/forms/Button";
import {Tag as TTag} from "../../../common/types/responses";
import Tag from "./Tag";
import {useGetTagsQuery} from "../../../common/services/useTag";


type TagValuesType = {
    onAdd?: ()=> void
    value?: number[]
    projectId: string
}

const TagValues: FC<TagValuesType> = ({
    onAdd,
    value,
                                          projectId
}) => {
    const {data:tags} = useGetTagsQuery({projectId})
    return (
        <Row className="tag-values">
            {tags?.map(tag => value?.includes(tag.id) && (
                <Tag
                    hideNames
                    onClick={onAdd}
                    className="px-2 py-2 mr-2"
                    tag={tag}
                />
            ))}
            {!!onAdd && (
                <Button onClick={onAdd} type="button" className="btn--outline">
                    Add Tag
                </Button>
            ) }
        </Row>
    )
}

export default TagValues
