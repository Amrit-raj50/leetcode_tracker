import React, { useEffect, useState } from "react";

export default function Track() {
  const [data, setData] = useState(null);

  const userName = "amritrajjh17";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username

              profile {
                realName
                ranking
                reputation
                countryName
                company
                school
              }

              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }

                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `;

        const response = await fetch("https://leetcode.com/graphql", {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            query,
            variables: {
              username: userName
            }
          })
        });

        console.log("Status:", response.status);

        const result = await response.json();

        console.log("LeetCode:", result);

        setData(result);
      } catch (error) {
        console.error("FETCH ERROR:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>LeetCode</h1>

      <pre>
        {data
          ? JSON.stringify(data, null, 2)
          : "Loading..."}
      </pre>
    </div>
  );
}