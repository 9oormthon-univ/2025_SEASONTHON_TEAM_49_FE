import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 레이아웃 & 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background: #f4f4f4;
  padding: 20px;
  position: relative;
`;

const Popup = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  text-align: center;
  z-index: 10;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 20px 0;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  font-size: 20px;
  padding: 20px 30px;
  margin: 10px;
  border-radius: 12px;
  width: 200px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const MenuRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 150px);
  gap: 20px;
  margin-top: 20px;
`;

const MenuCard = styled.div`
  background: white;
  border: 2px solid ${({ active, theme }) =>
    active ? theme.colors.primary : "#ddd"};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ConfirmButton = styled(Button)`
  margin-top: 30px;
`;

const ResultBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

const BackButton = styled.button`
  position: fixed;
  bottom: 20px;
  background: #666;
  color: white;
  border: none;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background: #444;
  }
`;

const StepBackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: #999;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #777;
  }
`;

// ---------------------------------

export default function MovieKiosk() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(null);

  // 선택 상태
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState({ adult: 0, teen: 0, senior: 0 });
  const [selectedPayment, setSelectedPayment] = useState(null);

  const movies = ["영화 1", "영화 2", "영화 3", "영화 4"];
  const times = ["10:00", "13:00", "16:00", "19:00"];
  const payments = ["카드", "현금", "간편결제"];

  const handleClosePopup = () => {
    setShowPopup(false);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // 결제 단계 → 결과로 이동하면서 점수 계산
      const end = Date.now();
      calculateScore(end - startTime);
      setStep(5);
    }
  };

  const handleStepBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const calculateScore = (elapsedMs) => {
    const elapsedSec = Math.floor(elapsedMs / 1000);
    let point = 0;
    if (elapsedSec <= 30) point = 100;
    else if (elapsedSec <= 60) point = 80;
    else if (elapsedSec <= 120) point = 50;
    else point = 20;
    setScore({ elapsedSec, point });
  };

  // ---------------------------
  // 결과 화면
  if (step === 5 && score) {
    return (
      <Container>
        <ResultBox>
          <h2>잘하셨습니다!</h2>
          <p style={{ fontSize: "20px" }}>⏱ 걸린 시간: {score.elapsedSec}초</p>
          <p style={{ fontSize: "20px" }}>⭐ 점수: {score.point}점</p>
          <p style={{ fontSize: "20px" }}>
            🎬 {selectedMovie} / ⏰ {selectedTime} <br />
            👥 성인 {selectedPeople.adult}, 청소년 {selectedPeople.teen}, 경로 {selectedPeople.senior} <br />
            💳 {selectedPayment}
          </p>
          <Button onClick={() => window.location.reload()}>다시하기</Button>
          <Button onClick={() => navigate("/home")}>홈으로</Button>
        </ResultBox>
        <BackButton onClick={() => navigate("/practice")}>
          연습 모드로 돌아가기
        </BackButton>
      </Container>
    );
  }

  // ---------------------------
  return (
    <Container>
      {showPopup && (
        <Popup>
          <Title>오늘의 미션</Title>
          <p>🎬 영화 2</p>
          <p>⏰ 16:00</p>
          <p>👥 성인 2명</p>
          <p>💳 카드 결제</p>
          <Button onClick={handleClosePopup}>닫기</Button>
        </Popup>
      )}

      {!showPopup && (
        <>
          {step > 0 && step < 5 && (
            <StepBackButton onClick={handleStepBack}>이전 단계</StepBackButton>
          )}

          {/* STEP 0: 메뉴 */}
          {step === 0 && (
            <>
              <Title>메뉴 선택</Title>
              <MenuRow>
                <MenuCard onClick={handleNext}>티켓 구매</MenuCard>
                <MenuCard>예매 티켓 발권</MenuCard>
                <MenuCard>매점 구매</MenuCard>
              </MenuRow>
            </>
          )}

          {/* STEP 1: 영화 */}
          {step === 1 && (
            <>
              <Title>영화 선택</Title>
              <MenuRow>
                {movies.map((m) => (
                  <MenuCard
                    key={m}
                    onClick={() => setSelectedMovie(m)}
                    active={selectedMovie === m}
                  >
                    {m}
                  </MenuCard>
                ))}
              </MenuRow>
              <ConfirmButton onClick={handleNext}>확인</ConfirmButton>
            </>
          )}

          {/* STEP 2: 시간 */}
          {step === 2 && (
            <>
              <Title>시간 선택</Title>
              <MenuRow>
                {times.map((t) => (
                  <MenuCard
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    active={selectedTime === t}
                  >
                    {t}
                  </MenuCard>
                ))}
              </MenuRow>
              <ConfirmButton onClick={handleNext}>확인</ConfirmButton>
            </>
          )}

          {/* STEP 3: 인원 */}
          {step === 3 && (
            <>
              <Title>인원 선택</Title>
              <MenuRow>
                <MenuCard onClick={() => setSelectedPeople({ ...selectedPeople, adult: selectedPeople.adult + 1 })}>
                  성인 {selectedPeople.adult}
                </MenuCard>
                <MenuCard onClick={() => setSelectedPeople({ ...selectedPeople, teen: selectedPeople.teen + 1 })}>
                  청소년 {selectedPeople.teen}
                </MenuCard>
                <MenuCard onClick={() => setSelectedPeople({ ...selectedPeople, senior: selectedPeople.senior + 1 })}>
                  경로 {selectedPeople.senior}
                </MenuCard>
              </MenuRow>
              <ConfirmButton onClick={handleNext}>확인</ConfirmButton>
            </>
          )}

          {/* STEP 4: 결제 */}
          {step === 4 && (
            <>
              <Title>결제 수단 선택</Title>
              <MenuRow>
                {payments.map((p) => (
                  <MenuCard
                    key={p}
                    onClick={() => setSelectedPayment(p)}
                    active={selectedPayment === p}
                  >
                    {p}
                  </MenuCard>
                ))}
              </MenuRow>
              <ConfirmButton onClick={handleNext}>결제하기</ConfirmButton>
            </>
          )}
        </>
      )}

      {!showPopup && step < 5 && (
        <BackButton onClick={() => navigate("/practice")}>
          연습 모드로 돌아가기
        </BackButton>
      )}
    </Container>
  );
}