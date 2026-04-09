import type { Metadata } from "next";
import Link from "next/link";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "Dummy Page | Eric Huang",
  description: "A simple longform page for request testing.",
};

const storyParagraphs = [
  "The train from Port Alder arrived before sunrise, carrying crates of oranges, damp notebooks, and a brass telescope wrapped in a wool blanket. Mara stepped onto the platform convinced she would stay for only one afternoon, just long enough to return a borrowed map and apologize for leaving town without warning.",
  "By breakfast the harbor was already making other plans. Fishermen were arguing about the weather in front of the bakery, gulls were circling low over the cannery roofs, and a line had formed outside the repair shop because the clock on the church tower had started chiming at odd intervals during the night. Every conversation seemed to contain a detail she had not expected to hear again.",
  "She followed the market road uphill until the noise thinned out and the air smelled more like cedar than salt. At the overlook she found the same bench where she used to eat pears after school, though the paint had peeled and someone had carved a careful constellation into the backrest. From there the entire inlet looked arranged by hand, as if the town had been placed on the shore that morning for her inspection.",
  "Around noon Mara met a courier named Ivo, who claimed the missing map had never really been missing. According to him, the folded sheet had spent the last six months moving from pocket to pocket, collecting notes in three kinds of ink. The original coastlines were still visible, but the margins now carried recipes, tide tables, and one improbable list of places where a person could disappear without feeling lost.",
  "They spent the afternoon testing those notes against the town itself. A narrow stair behind the pharmacy led to a garden hidden between two brick walls. The alley beside the cinema opened into a courtyard full of laundry lines and lemon trees. Near the edge of the harbor they found an iron gate that looked permanently locked until a child pushed it open with one shoulder and ran through laughing.",
  "When evening settled in, the first lamps along the quay turned the water copper. Mara unfolded the map on a cafe table and realized it no longer described a route out of town. It described a way of staying: where to stand when the fog rolled in, which rooftops caught the last light, who kept spare keys for neighbors, and how long it took for a stranger to become part of the local weather.",
  "She wrote a short note across the bottom margin before returning the map. It said only that departures are easier to plan than arrivals, and that some places deserve a second introduction. By the time the station bell rang again, she had missed the last train on purpose and ordered another pot of tea.",
];

export default function DummyPage(): JSX.Element {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
        color: "#0f172a",
        padding: "64px 24px 96px",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 760,
          borderRadius: 28,
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
          padding: "40px 28px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#4338ca",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Dummy Story Route
        </p>
        <h1
          style={{
            margin: "16px 0 12px",
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            lineHeight: 1,
          }}
        >
          A return to Port Alder
        </h1>
        <p
          style={{
            margin: 0,
            color: "#475569",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          A deliberately generic page with a few paragraphs of prose, useful when you
          just need a route with real HTML content under <code>/requests</code>.
        </p>

        <div style={{ display: "grid", gap: 22, marginTop: 36 }}>
          {storyParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.9,
                color: "#1e293b",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Link
            href="/requests"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              background: "#0f172a",
              color: "#ffffff",
              padding: "12px 18px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Back to requests
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              padding: "12px 18px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
