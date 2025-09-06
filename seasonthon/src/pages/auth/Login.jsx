import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: ${({ isTop }) => (isTop ? "1px solid #ccc" : "none")};
  padding: 20px;
`;
const Input = styled.input`
  padding: 10px;
  margin: 8px 0;
  width: 220px;
  font-size: 16px;
`;
const Button = styled.button`
  background-color: ${({ theme }) => theme?.colors?.primary || "#4a90e2"};
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background-color: ${({ theme }) => theme?.colors?.primaryDark || "#357ab7"};
  }
`;
const MemberCodeDisplay = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

export default function Login() {
  const navigate = useNavigate();

  // 가입 입력값
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // 로그인 입력값
  const [inputCode, setInputCode] = useState("");

  // 가입 처리를 서버에 요청
  const handleRegister = async () => {
    if (!name || !birth || !phone) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/register", {
        name,
        birth,
        phone,
      });
      // 예시: { code: "ABC123" } 형태로 반환
      setGeneratedCode(response.data.code);
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  // 로그인 처리
  const handleLogin = async () => {
    if (!inputCode) {
      alert("회원 코드를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api", {
        code: inputCode,
      });
      // 성공 시 status 200, 데이터 포함
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("회원 코드가 일치하지 않습니다.");
    }
  };

  return (
    <Container>
      <Section isTop>
        <h2>회원가입</h2>
        <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="생년월일 ex)19501234" value={birth} onChange={(e) => setBirth(e.target.value)} />
        <Input placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button onClick={handleRegister}>회원가입</Button>
        {generatedCode && <MemberCodeDisplay>회원 코드: {generatedCode}</MemberCodeDisplay>}
      </Section>

      <Section>
        <h2>로그인</h2>
        <Input
          placeholder="회원 코드 입력"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <Button onClick={handleLogin}>로그인</Button>
      </Section>
    </Container>
  );
}



{/* import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
`;

export default function Login() {
  const navigate = useNavigate();

  // 사용자 입력값 저장
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // 입력된 아이디
          password: password, // 입력된 비밀번호
        }),
      });

      if (!response.ok) {
        alert("로그인 실패");
        return;
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      // 로그인 성공하면 홈 화면으로 이동
      navigate("/home");
    } catch (error) {
      console.error("로그인 요청 에러:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <Container>
      <h1>로그인</h1>
      <Input
        type="text"
        placeholder="이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="생년월일 ex)19501234)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <Input
        type="password"
        placeholder="전화번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </Container>
  );
}

 */}