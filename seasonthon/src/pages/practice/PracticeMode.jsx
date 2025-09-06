import { useNavigate } from "react-router-dom";

function PracticeMode() {
  const navigate = useNavigate();

  return (
    <div style={styles.pageContainer}>
      {/* 키오스크 연습 박스 */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>키오스크 연습</h2>
        <div style={styles.buttonGrid}>
          <button style={styles.button} onClick={() => navigate("/practice/kiosk/restaurant")}>식당</button>
          <button style={styles.button} onClick={() => navigate("/practice/kiosk/cafe")}>카페</button>
          <button style={styles.button} onClick={() => navigate("/practice/kiosk/cinema")}>영화관</button>
          <button style={styles.button} onClick={() => navigate("/practice/kiosk/parking")}>주차정산</button>
        </div>
      </div>

      {/* 휴대폰 기능 연습 박스 */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>휴대폰 기능 연습</h2>
        <div style={styles.buttonGrid}>
          <button style={styles.button} onClick={() => navigate("/practice/phone/gallery")}>갤러리</button>
          <button style={styles.button} onClick={() => navigate("/practice/phone/message")}>메시지</button>
          <button style={styles.button} onClick={() => navigate("/practice/phone/contacts")}>연락처</button>
        </div>
      </div>

      {/* 홈으로 돌아가기 버튼 */}
      <button style={styles.backButton} onClick={() => navigate("/home")}>
        홈으로 돌아가기
      </button>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "50px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  },
  button: {
    padding: "16px",
    height: "100px",  
    fontSize: "18px",
    backgroundColor: "#999",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    minHeight: "60px",
  },
  backButton: {
    marginTop: "50px",
    width: "100%",
    padding: "20px 0",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#4a90e2",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default PracticeMode;
