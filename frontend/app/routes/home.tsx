import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Header from "../components/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

interface TestData {
  id: string;
  [key: string]: any;
}

export default function Home() {
  const [data, setData] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/test");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract all unique keys from data for table headers
  const getTableHeaders = () => {
    if (data.length === 0) return [];
    const allKeys = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys);
  };

  const headers = getTableHeaders();

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--bg-color)', padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#ffffffff' }}>
            Database Records
          </h1>

          {loading && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#000' }}>
              Loading data...
            </div>
          )}

          {error && (
            <div style={{
              padding: '20px',
              backgroundColor: '#fee',
              color: '#c00',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              Error: {error}
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              No data available
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    {headers.map(header => (
                      <th
                        key={header}
                        style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontWeight: '600',
                          borderBottom: '2px solid #e0e0e0',
                          textTransform: 'capitalize',
                          color: '#000'
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={row.id || index}
                      style={{
                        borderBottom: '1px solid #e0e0e0',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {headers.map(header => (
                        <td
                          key={header}
                          style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            color: '#000'
                          }}
                        >
                          {typeof row[header] === 'object'
                            ? JSON.stringify(row[header])
                            : String(row[header] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
            Total records: {data.length}
          </div>
        </div>
      </main>
    </>
  );
}
