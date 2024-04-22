"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  emailRegex,
  lastNameRegex,
  nameRegex,
  nationalCodeRegex,
} from "@/lib/utils";

const EditModal = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [err, setErr] = useState("");

  const router = useRouter();

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const editHandler = async () => {
    setErr("");
    if (!userData.name.trim() || !nameRegex.test(userData.name)) {
      return setErr("نام کاربر غیر معتبر میباشد.");
    } else if (
      !userData.lastname.trim() ||
      !lastNameRegex.test(userData.lastname)
    ) {
      return setErr("نام خانوادگی کاربر غیر معتبر میباشد.");
    } else if (!userData.email.trim() || !emailRegex.test(userData.email)) {
      return setErr("ایمیل نامعتبر میباشد");
    } else if (
      !userData.nationalcode ||
      !nationalCodeRegex.test(userData.nationalcode)
    ) {
      return setErr("کد ملی نامعتبر میباشد.");
    } else if (!userData.longitude || !userData.latitude) {
      return setErr("اطلاعات جغرافیایی را وارد نمائید");
    }

    const res = await fetch(`http://localhost:3001/users/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.status === 200) {
      toast.success("کاربر با موفقیت ویرایش گردید");
      router.refresh();
      setTimeout(() => {
        typeof window !== "undefined" && window.location.reload();
      }, 750);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil strokeWidth={1.1} size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-start mt-7">ویرایش کاربر</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            value={userData?.name}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="نام"
          />
          <Input
            value={userData?.lastname}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
            placeholder="نام خانوادگی"
          />
          <Input
            value={userData?.email}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="ایمیل"
          />
          <Input
            value={userData?.nationalcode}
            type="number"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                nationalcode: e.target.value,
              }))
            }
            placeholder="کد ملی"
          />
          <Input
            value={userData?.longitude}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                longitude: e.target.value,
              }))
            }
            placeholder="طول جغرافیایی"
          />
          <Input
            value={userData?.latitude}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                latitude: e.target.value,
              }))
            }
            placeholder="عرض جغرافیایی"
          />
          {err && (
            <p className="text-rose-500 text-sm px-4 font-semibold">{err}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={editHandler} type="submit">
            ویرایش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
