"use client";

import dynamic from "next/dynamic";
const MapModal = dynamic(() => import("./MapModal"), { ssr: false });

import { useState } from "react";

import ViewModal from "./ViewModal";
import AddUserModal from "./AddUserModal";
import EditModal from "./EditModal";
import RemoveModal from "./RemoveModal";
import ChartModal from "./ChartModal";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3>لیست کاربران</h3>
        <AddUserModal />
      </div>
      <Table dir="rtl">
        <TableCaption>
          لیستی از تمامی کاربرانی که تاکنون در سایت ثبت نام کرده اند.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">ردیف</TableHead>
            <TableHead className="text-right">نام</TableHead>
            <TableHead className="text-right">نام خانوادگی</TableHead>
            <TableHead className="text-right">ایمیل</TableHead>
            <TableHead className="text-right">کدملی</TableHead>
            <TableHead className="text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <div className="md:text-lg text-rose-500">کاربری یافت نشد</div>
          ) : (
            data?.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  {user.nationalcode}
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  <div onClick={() => setSelectedUser(user)}>
                    <ViewModal user={selectedUser} />
                  </div>
                  <div onClick={() => setSelectedUser(user)}>
                    <EditModal user={selectedUser} />
                  </div>
                  <div onClick={() => setSelectedUser(user)}>
                    <MapModal
                      position={[
                        selectedUser?.latitude,
                        selectedUser?.longitude,
                      ]}
                    />
                  </div>
                  <div onClick={() => setSelectedUser(user)}>
                    <RemoveModal id={selectedUser?.id} />
                  </div>
                  <div onClick={() => setSelectedUser(user)}>
                    <ChartModal count={selectedUser?.numberoflogins} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
