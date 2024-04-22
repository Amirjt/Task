"use client"
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ViewModal = ({ user }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Eye strokeWidth={1.1} size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            اطلاعات کاربر
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            <ul className="flex flex-col gap-2">
              <li>نام : {user?.name}</li>
              <li>نام خانوادگی : {user?.lastname}</li>
              <li>ایمیل : {user?.email}</li>
              <li> کد ملی : {user?.nationalcode}</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>بستن</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ViewModal;
