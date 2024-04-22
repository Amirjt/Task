"use client";
import { Button } from "@/components/ui/button";
import { BarChartBig } from "lucide-react";

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

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const ChartModal = ({ count }) => {
  const chartData = [{ name: "ورودها", value: count }];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <BarChartBig strokeWidth={1.1} size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            تعداد ورود های کاربر
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            <BarChart
              width={400}
              height={300}
              className="mt-2 p-2 mx-auto"
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>بستن</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChartModal;
