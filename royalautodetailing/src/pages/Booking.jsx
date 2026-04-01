import BookingLayout from "../components/BookingLayout";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import "./style.css";

export default function Booking() {
  return (
    <>
      <SiteHeader activePage="booking" />
      <BookingLayout />
      <SiteFooter />
    </>
  );
}
