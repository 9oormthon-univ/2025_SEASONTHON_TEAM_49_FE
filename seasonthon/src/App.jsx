import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import Settings from "./pages/settings/setting";
import PracticeMode from "./pages/practice/PracticeMode";
import SolutionMode from "./pages/solution/SolutionMode";

// 연습
import Restaurant from "./pages/practice/kiosk/Restaurant";
import Cafe from "./pages/practice/kiosk/Cafe";
import Cinema from "./pages/practice/kiosk/Cinema";
import Parking from "./pages/practice/kiosk/Parking";

import Gallery from "./pages/practice/phone/Gallery";
import Message from "./pages/practice/phone/Message";
import Contacts from "./pages/practice/phone/Contacts";

// 설명
import S_restaurant from "./pages/solution/kiosk/S_restaurant";
import S_cafe from "./pages/solution/kiosk/S_cafe";
import S_cinema from "./pages/solution/kiosk/S_cinema";
import S_parking from "./pages/solution/kiosk/S_parking";

import S_gallery from "./pages/solution/phone/S_gallery";
import S_message from "./pages/solution/phone/S_message";
import S_contacts from "./pages/solution/phone/S_contacts";

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

        {/* 설명 모드 */}
        <Route path="/solution" element={<SolutionMode />} />

        {/* 키오스크 연습 */}
        <Route path="/practice/kiosk/restaurant" element={<Restaurant />} />
        <Route path="/practice/kiosk/cafe" element={<Cafe />} />
        <Route path="/practice/kiosk/cinema" element={<Cinema />} />
        <Route path="/practice/kiosk/parking" element={<Parking />} />

        {/* 휴대폰 연습 */}
        <Route path="/practice/phone/gallery" element={<Gallery />} />
        <Route path="/practice/phone/message" element={<Message />} />
        <Route path="/practice/phone/contacts" element={<Contacts />} />

        {/* 키오스크 설명 */}
        <Route path="/solution/kiosk/restaurant" element={<S_restaurant />} />
        <Route path="/solution/kiosk/cafe" element={<S_cafe />} />
        <Route path="/solution/kiosk/cinema" element={<S_cinema />} />
        <Route path="/solution/kiosk/parking" element={<S_parking />} />

        {/* 휴대폰 설명 */}
        <Route path="/solution/phone/gallery" element={<S_gallery />} />
        <Route path="/solution/phone/message" element={<S_message />} />
        <Route path="/solution/phone/contacts" element={<S_contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
