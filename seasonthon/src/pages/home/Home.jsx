// src/pages/home/Home.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import friendIcon from '../../assets/friend-icon.png';
import settingsIcon from '../../assets/settings-icon.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
  background-color: #f0f4f8;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MyScore = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;

  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const IconButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 400px) {
    width: 28px;
    height: 28px;
  }
`;

const FriendsContainer = styled.div`
  flex: 1;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); /* 카드 느낌 그림자 */
  overflow-y: auto;

  @media (max-width: 400px) {
    padding: 12px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 3px;
  }
`;

const FriendItem = styled.div`
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #f7f9fc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.1s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  @media (max-width: 400px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const HomeButton = styled.button`
  flex: 1;
  margin: 0 6px;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #357ab7;
  }

  @media (max-width: 400px) {
    margin: 0;
    padding: 12px 0;
    font-size: 14px;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const myScore = 12345;
  const friendsScores = [
    { name: '-----', score:0 },
    { name: '민수', score: 9870 },
    { name: '지우', score: 8760 },
    { name: '현우', score: 7650 },
  ];

  return (
    <Container>
      {/* 상단 헤더 */}
      <Header>
        <IconButton src={friendIcon} alt="친구 추가" onClick={() => navigate('/friends')} />
        <IconButton src={settingsIcon} alt="설정" onClick={() => navigate('/settings')} />
      </Header>

      {/* 내 점수 */}
      <MyScore>내 점수: {myScore}</MyScore>

      {/* 친구 점수 카드 */}
      <FriendsContainer>
        {friendsScores.map((friend, index) => (
          <FriendItem key={index}>
            {friend.name} - {friend.score}점
          </FriendItem>
        ))}
      </FriendsContainer>

      {/* 하단 버튼 */}
      <ButtonGroup>
        <HomeButton onClick={() => navigate('/practice')}>연습게임</HomeButton>
        <HomeButton onClick={() => navigate('/guide')}>설명서</HomeButton>
        <HomeButton onClick={() => navigate('/typing')}>타자연습</HomeButton>
      </ButtonGroup>
    </Container>
  );
};

export default Home;
