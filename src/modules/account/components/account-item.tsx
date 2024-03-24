type Props = {
  label: string;
  value?: any;
};

export const AccountItem = ({ label, value }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between border-b py-3">
      <p className="text-sm font-medium">{label}</p>
      <p className=" text-xs font-mono p-1 bg-stone-100 dark:bg-stone-800 rounded-md">
        {value}
      </p>
    </div>
  );
};
