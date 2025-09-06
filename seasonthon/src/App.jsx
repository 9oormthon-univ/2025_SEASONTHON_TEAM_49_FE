import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import Settings from "./pages/settings/setting";
import PracticeMode from "./pages/practice/PracticeMode";

{/* 키오스크 연습 */}
import Restaurant from "./pages/practice/kiosk/Restaurant";
import Cafe from "./pages/practice/kiosk/Cafe";
import Cinema from "./pages/practice/kiosk/Cinema";
import Parking from "./pages/practice/kiosk/Parking";
import Self_Service from "./pages/practice/kiosk/Self_Service";

{/* 휴대폰 연습 */}
import Gallery from "./pages/practice/phone/Gallery";
import Message from "./pages/practice/phone/Message";
import Contacts from "./pages/practice/phone/Contacts";
import Internet from "./pages/practice/phone/Internet";
import Kakao from "./pages/practice/phone/Kakao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/settings" element={<Settings />} />

        {/* 연습 모드 */}
        <Route path="/practice" element={<PracticeMode />} />

        {/* 키오스크 연습 */}
        <Route path="/practice/kiosk/restaurant" element={<Restaurant />} />
        <Route path="/practice/kiosk/cafe" element={<Cafe />} />
        <Route path="/practice/kiosk/cinema" element={<Cinema />} />
        <Route path="/practice/kiosk/parking" element={<Parking />} />
        <Route path="/practice/kiosk/self-service" element={<Self_Service />} />

        {/* 휴대폰 연습 */}
        <Route path="/practice/phone/gallery" element={<Gallery />} />
        <Route path="/practice/phone/message" element={<Message />} />
        <Route path="/practice/phone/contacts" element={<Contacts />} />
        <Route path="/practice/phone/internet" element={<Internet />} />
        <Route path="/practice/phone/kakao" element={<Kakao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
