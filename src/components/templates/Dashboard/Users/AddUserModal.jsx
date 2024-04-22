"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { UserRoundPlus } from "lucide-react";

import { useRouter } from "next/navigation";

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

const AddUserModal = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    nationalCode: "",
    longitude: 0,
    latitude: 0,
  });
  const [err, setErr] = useState("");

  const router = useRouter();

  const addHandler = async () => {
    setErr("");
    if (!userData.name.trim() || !nameRegex.test(userData.name)) {
      return setErr("نام کاربر غیر معتبر میباشد.");
    } else if (
      !userData.lastName.trim() ||
      !lastNameRegex.test(userData.lastName)
    ) {
      return setErr("نام خانوادگی کاربر غیر معتبر میباشد.");
    } else if (!userData.email.trim() || !emailRegex.test(userData.email)) {
      return setErr("ایمیل نامعتبر میباشد");
    } else if (
      !userData.nationalCode ||
      !nationalCodeRegex.test(userData.nationalCode)
    ) {
      return setErr("کد ملی نامعتبر میباشد.");
    } else if (!userData.longitude || !userData.latitude) {
      return setErr("اطلاعات جغرافیایی را وارد نمائید");
    }

    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        lastname: userData.lastName,
        email: userData.email,
        nationalcode: +userData.nationalCode,
        latitude: +userData.latitude,
        longitude: +userData.longitude,
        numberoflogins: 0,
      }),
    });

    if (res.status === 201) {
      toast.success("کاربر با موفقیت اضافه گردید");
      router.refresh();
      setTimeout(() => {
       typeof window !== "undefined" && window.location.reload();
      }, 750);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          افزودن کاربر جدید
          <UserRoundPlus strokeWidth={1.1} size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-start mt-7">
            افزودن کاربر جدید
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="نام"
          />
          <Input
            value={userData.lastName}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            placeholder="نام خانوادگی"
          />
          <Input
            value={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="ایمیل"
          />
          <Input
            value={userData.nationalCode}
            type="number"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                nationalCode: e.target.value,
              }))
            }
            placeholder="کد ملی"
          />
          <Input
            value={userData.longitude}
            type="number"
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                longitude: e.target.value,
              }))
            }
            placeholder="طول جغرافیایی"
          />
          <Input
            value={userData.latitude}
            type="number"
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
          <Button onClick={addHandler} type="submit">
            افزودن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
