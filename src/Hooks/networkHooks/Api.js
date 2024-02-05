import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    formatQueryOptions,
    postRequest,
    putRequest,
    deleteRequest
} from "../../Utils/network"


export const useApiReceive = (key, fn, options) => useQuery({
    queryKey: key,
    queryFn: fn,
    ...options
})

export const useApiSend = (fn, success, error, invalidateKey, options) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fn,
        onSuccess: (data) => {
            invalidateKey &&
                invalidateKey.forEach((key) => {
                    queryClient.invalidateQueries(key);
                });
            success && success(data);
        },
        onError: error,
        retry: 2,
        ...options, 
    });
};

// export const UseApiPut = (
//     fn,
//     success,
//     error,
//     options,
//     invalidateKey,
// ) => formatQueryOptions(putRequest(fn), success, error, invalidateKey, options)


// export const UseApiDelete = (
//     fn,
//     success,
//     error,
//     invalidateKey,
//     options
// ) => formatQueryOptions(deleteRequest(fn), success, error, invalidateKey, options)


