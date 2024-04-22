import DataTable from "@/components/templates/Dashboard/Users/DataTable";
import Search from "@/components/templates/Dashboard/Users/Search";

const getData = async () => {
  const res = await fetch("http://localhost:3001/users?_sort=-id", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

const HomePage = async ({ searchParams }) => {
  const users = await getData();

  const { name, lastname, nationalcode } = searchParams;

  let filteredUsers = users;
  if (searchParams && (name || lastname || nationalcode)) {
    filteredUsers = users.filter((user) => {
      const isNameMatch = !name || user.name.includes(name);
      const isLastNameMatch = !lastname || user.lastname.includes(lastname);
      const isNationalCodeMatch =
        !nationalcode || user.nationalcode.toString().includes(nationalcode);

      return isNameMatch && isLastNameMatch && isNationalCodeMatch;
    });
  }

  return (
    <div className="p-5 border border-muted rounded-lg m-3 flex flex-col gap-5">
      <Search />
      <DataTable data={filteredUsers} />
    </div>
  );
};

export default HomePage;
