// ===================== Exercise 1: Form Management Custom Hook =====================
import React, { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const useForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (fieldValues: Partial<FormValues> = values) => {
    const temp: FormErrors = {};
    if ("email" in fieldValues)
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
        ? ""
        : "Invalid email";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length >= 6
          ? ""
          : "Password must be at least 6 characters";
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = (callback: () => void) => (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) callback();
  };

  return { values, errors, handleChange, handleSubmit };
};

const RegistrationForm: React.FC = () => {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  const submitForm = () => alert("Form submitted successfully!");

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label>Email:</label>
        <input name="email" value={values.email} onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

// ===================== Exercise 2: Data Table Component =====================
interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  onSelect?: (selected: T[]) => void;
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onSort,
  onSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    onSort && onSort(key, direction);
  };

  const handleSelect = (id: number | string) => {
    const newSet = new Set(selectedRows);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedRows(newSet);
    onSelect && onSelect(data.filter(item => newSet.has(item.id)));
  };

  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows(new Set());
      onSelect && onSelect([]);
    } else {
      const allIds = data.map(item => item.id);
      setSelectedRows(new Set(allIds));
      onSelect && onSelect(data);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
          </th>
          {columns.map(col => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key)}
              style={{ cursor: col.sortable ? "pointer" : "default" }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={String(item.id)}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.has(item.id)}
                onChange={() => handleSelect(item.id)}
              />
            </td>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render ? col.render(item) : String(item[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ===================== Exercise 3: Data Fetching and Caching System =====================
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const useDataFetching = <T>(url: string, config: { maxAge: number }) => {
  const cache = React.useRef<Map<string, CacheEntry<T>>>(new Map());
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const cached = cache.current.get(url);
      const now = Date.now();
      if (cached && now - cached.timestamp < config.maxAge) {
        setData(cached.data);
      } else {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response not ok");
        const result: T = await response.json();
        cache.current.set(url, { data: result, timestamp: now });
        setData(result);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url]);

  const invalidateCache = () => cache.current.delete(url);
  const refetch = () => {
    invalidateCache();
    fetchData();
  };

  return { data, loading, error, refetch, invalidateCache };
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserListWithCache: React.FC = () => {
  const { data: users, loading, error, refetch, invalidateCache } =
    useDataFetching<User[]>("https://jsonplaceholder.typicode.com/users", {
      maxAge: 300000,
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users) return <p>No users available</p>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refresh</button>
      <button
        onClick={() => {
          invalidateCache();
          refetch();
        }}
      >
        Clear Cache & Refresh
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

// ===================== Export Components =====================
export { RegistrationForm, DataTable, UserListWithCache };
