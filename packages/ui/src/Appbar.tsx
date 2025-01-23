import { Button } from "./button";

interface AppbarProps {
  user?: {
    name: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between items-center border-b border-slate-400 px-1 bg-yellow-100 shadow-md sm:px-3 md:px-4">
      <div className="text-sm flex flex-col justify-center px-2 font-bold sm:text-lg md:text-xl">PayPay</div>
      <div className="flex  justify-center items-center gap-2">
        {user && <div className="text-sm text-slate-800 font-bold sm:text-lg md:text-xl">{user?.name}</div>}
        <div className="pt-2">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};
