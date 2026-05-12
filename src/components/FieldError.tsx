const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className='text-destructive -mt-1! text-left font-mono text-xs' role='alert'>
      {message}
    </p>
  );
};

export { FieldError };
