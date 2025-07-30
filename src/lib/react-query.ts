import { Problem } from "@/types/http-errors.interface";
import { Notification } from "@/types/notification.interface";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // show nofification
    },
  }),

  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      //show notification
      showNotifications(error as Problem);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const showNotifications = (problem: Problem) => {
  const nofifications: Omit<Notification, "id">[] = [];

  if (problem?.errors) {
    Object.entries(problem.errors).forEach(([_, values]) =>
      values.forEach((errorMessage) =>
        nofifications.push({
          message: errorMessage,
          type: "error",
        })
      )
    );
  } else if (problem.detail) {
    nofifications.push({
      message: problem.detail,
      type: "error",
    });
  }
};
