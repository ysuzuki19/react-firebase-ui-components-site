export const devlog = (message?: any, ...optionalParams: any[]): void => {
  if (process.env.NODE_ENV === 'production') return;
  if (optionalParams.length === 0) {
    console.log(message);
  } else {
    console.log(message, ...optionalParams);
  }
};
