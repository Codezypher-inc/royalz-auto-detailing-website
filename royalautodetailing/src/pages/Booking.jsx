import BookingLayout from "../components/BookingLayout";
import Seo from "../components/Seo";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { buildLocalBusinessSchema, buildWebPageSchema } from "../lib/seo";
import "./style.css";

export default function Booking() {
  const title = "Book Auto Detailing Services";
  const description =
    "Book ceramic coating, tint, wraps, and premium auto detailing services with Royalz Auto Detailing in Halifax.";

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/booking"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            buildLocalBusinessSchema(),
            buildWebPageSchema({
              title,
              description,
              path: "/booking",
            }),
          ],
        }}
      />
      <SiteHeader activePage="booking" />
      <BookingLayout />
      <SiteFooter />
    </>
  );
}
