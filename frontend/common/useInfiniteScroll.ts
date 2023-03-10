import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { useCallback, useEffect, useState } from 'react'
import { PagedRequest } from './types/requests'
import { PagedResponse } from './types/responses'
import { QueryDefinition } from '@reduxjs/toolkit/query'
import useThrottle from './useThrottle'

const useInfiniteScroll = <
    REQ extends PagedRequest<{}>,
    RES extends PagedResponse<{}>,
>(
        useGetDataListQuery: UseQuery<QueryDefinition<REQ, any, any, RES>>,
        queryParameters: REQ,
        throttle = 100,
    ) => {
    const [localPage, setLocalPage] = useState(1)
    const [combinedData, setCombinedData] = useState<RES | null>(null)
    const [q, setQ] = useState('')

    const queryResponse = useGetDataListQuery({
        ...queryParameters,
        page: localPage,
        q,
    })

    useEffect(() => {
        if (queryResponse?.data) {
            if (queryResponse.originalArgs?.page === 1) {
                setCombinedData(queryResponse?.data)
            } else {
                // This is a new page, combine the data
                setCombinedData(
                    (prev) =>
                        ({
                            ...queryResponse.data,
                            results: prev?.results
                                ? prev.results.concat(queryResponse!.data!.results)
                                : queryResponse!.data!.results,
                        } as RES),
                )
            }
        }
    }, //eslint-disable-next-line
        [queryResponse?.data]
    )

    const searchItems = useThrottle((search: string) => {
        setQ(search)
        setLocalPage(1)
    }, throttle)

    const refresh = useCallback(() => {
        setLocalPage(1)
    }, [])

    const loadMore = () => {
        if (queryResponse?.data?.next) {
            setLocalPage((page) => page + 1)
        }
    }

    return {
        data: combinedData,
        isLoading: queryResponse.isLoading,
        loadMore,
        refresh,
        response: queryResponse,
        searchItems,
    }
}

export default useInfiniteScroll
/*  Usage example:
const {data, isLoading, searchItems, loadMore} =
useInfiniteScroll<Req['getX'], Res['x']>(useGetXQuery, { page_size:10, otherParam:"test" })
*/
