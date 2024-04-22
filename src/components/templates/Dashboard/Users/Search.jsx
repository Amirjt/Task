"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    name: "",
    lastname: "",
    nationalcode: null,
  });

  useEffect(() => {
    const name = searchParams.get("name");
    const lastname = searchParams.get("lastname");
    const nationalcode = searchParams.get("nationalcode");

    if (name) setFilters((prev) => ({ ...prev, name }));
    if (lastname) setFilters((prev) => ({ ...prev, lastname }));
    if (nationalcode) setFilters((prev) => ({ ...prev, nationalcode }));
  }, [searchParams]);

  const searchHandler = () => {
    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.set("name", filters.name);
    if (filters.lastname) queryParams.set("lastname", filters.lastname);
    if (filters.nationalcode)
      queryParams.set("nationalcode", filters.nationalcode);

    const url = `/?${queryParams.toString()}`;
    router.push(url);
  };

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>جستجوی کاربر</AccordionTrigger>
          <AccordionContent className="p-3 flex flex-col md:flex-row md:items-center gap-3">
            <Input
              placeholder="نام"
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <Input
              placeholder="نام خانوادگی"
              value={filters.lastname}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  lastname: e.target.value,
                }))
              }
            />
            <Input
              placeholder="کد ملی"
              value={filters.nationalcode}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  nationalcode: e.target.value,
                }))
              }
            />
            <Button onClick={searchHandler}>جستجو</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Search;
