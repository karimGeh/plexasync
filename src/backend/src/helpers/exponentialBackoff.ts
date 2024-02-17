export const exponentialBackoff = async ({
  attempt_number = 0,
  minimum_wait_time = 1000,
  exponential_factor = 2,
}) => {
  const wait_time =
    minimum_wait_time * Math.exp(exponential_factor * attempt_number);
  await new Promise((resolve) => setTimeout(resolve, wait_time));
  return wait_time;
};
