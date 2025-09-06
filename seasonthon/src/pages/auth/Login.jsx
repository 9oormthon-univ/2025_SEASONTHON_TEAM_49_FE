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

  const [name, setName] = useState("");
  const [birth, setBirth] = useState(""); // 형식: YYYY-MM-DD
  const [phone, setPhone] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  // 회원가입 요청
  const handleRegister = async () => {
    if (!name || !birth || !phone) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/signup",
        {
          name,
          phone,
          birthDate: birth, // 주의: 'birthDate' 키로 전송
        },
        {
          withCredentials: true, // 쿠키 저장
        }
      );

      setGeneratedCode(response.data.memberCode); // 백엔드에서 받은 코드
      alert("회원가입 성공!");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  // 로그인 요청
  const handleLogin = async () => {
    if (!inputCode) {
      alert("회원 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          memberCode: inputCode,
        },
        {
          withCredentials: true, // 쿠키 저장
        }
      );

      alert(`환영합니다, ${response.data.name}님`);
      navigate("/home");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("회원 코드가 일치하지 않습니다.");
    }
  };

  return (
    <Container>
      <Section isTop>
        <h2>회원가입</h2>
        <Input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="생년월일 (YYYY-MM-DD)"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <Input
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button onClick={handleRegister}>회원가입</Button>

        {generatedCode && (
          <MemberCodeDisplay>회원 코드: {generatedCode}</MemberCodeDisplay>
        )}
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