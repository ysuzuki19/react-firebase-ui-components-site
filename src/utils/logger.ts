export const devlog = (message?: any, ...optionalParams: any[]): void => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(message, optionalParams);
};
