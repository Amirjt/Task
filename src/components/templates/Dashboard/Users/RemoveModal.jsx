"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RemoveModal = ({ id }) => {
  const router = useRouter();
  const removeHandler = async () => {
    const res = await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      toast.success("کاربر با موفقیت حذف گردید/");
      router.refresh();
      setTimeout(() => {
        typeof window !== "undefined" && window.location.reload();
      }, 750);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 strokeWidth={1.1} size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            آیا اطمینان دارید؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            با حذف کردن کاربر اطلاعات ایشان دیگر قابل بازگردانی نمیباشد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"gap-1"}>
          <AlertDialogCancel>لغو</AlertDialogCancel>
          <AlertDialogAction
            onClick={removeHandler}
            className="bg-rose-500 hover:bg-rose-400 transition"
          >
            حذف{" "}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveModal;
