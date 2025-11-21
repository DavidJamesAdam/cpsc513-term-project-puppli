import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import Header from "../components/header/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posts" },
    { name: "description", content: "View all posts" },
  ];
}

interface Post {
  id: string;
  UserId: string;
  petId: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  voteCount: number;
  favouriteCount: number;
}

export default function Home() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/posts");

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

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--bg-color)', padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#ffffffff' }}>
            Posts
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
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>ID</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>Caption</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>User ID</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>Pet ID</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>Votes</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>Favourites</th>
                    <th style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: '600',
                      borderBottom: '2px solid #e0e0e0',
                      color: '#000'
                    }}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((post) => (
                    <tr
                      key={post.id}
                      style={{
                        borderBottom: '1px solid #e0e0e0',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000',
                        fontSize: '12px'
                      }}>{post.id}</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000'
                      }}>{post.caption}</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000',
                        fontSize: '12px'
                      }}>{post.UserId}</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000',
                        fontSize: '12px'
                      }}>{post.petId}</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000'
                      }}>{post.voteCount}</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000'
                      }}>{post.favouriteCount}</td>
                      <td style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: '#000',
                        fontSize: '12px'
                      }}>{new Date(post.createdAt).toLocaleDateString()}</td>
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
