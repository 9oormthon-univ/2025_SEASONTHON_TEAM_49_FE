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

  const handleLogin = () => {
    // 일단 로그인 성공하면 홈 화면으로 이동
    navigate("/home");
  };

  return (
    <Container>
      <h1>로그인</h1>
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비밀번호" />
      <Button onClick={handleLogin}>로그인</Button>
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
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </Container>
  );
}

 */}