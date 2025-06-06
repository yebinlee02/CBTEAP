import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Smile, Frown, Meh, Heart, Angry, Bell, Award, Target, MessageCircle, BarChart3, Calendar, Settings, Users, TrendingUp, AlertTriangle, CheckCircle, Home, User, Shield, Star, ThumbsUp, RefreshCw, Zap, Gift, BookOpen, Menu, X } from 'lucide-react';

const MobileApp = () => {
  const [userType, setUserType] = useState('landing');
  const [currentScreen, setCurrentScreen] = useState('main');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionRange, setEmotionRange] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 사용자 상태 (예시 데이터)
  const [userStats, setUserStats] = useState({
    streak: 7,
    level: 5,
    exp: 340,
    maxExp: 500,
    tokens: 1250,
    collectedCards: [
      { name: '파국화 팀장님', level: 2, description: '최악만 생각하는' },
      { name: '흑백사고 부장님', level: 1, description: '완벽하지 않으면 실패' }
    ],
    weeklyGoal: '스트레스 관리',
    goalProgress: 73,
    canGiveAdvice: false,
    canEmpathize: true
  });

  // 인지왜곡 탐지 질문들
  const cognitiveQuestions = [
    {
      question: "오늘 실수했을 때 가장 먼저 떠오른 생각은?",
      options: [
        "완전히 망쳤다, 모든 게 끝났어",
        "실수할 수도 있지, 다음엔 더 조심하자",
        "다들 나를 바보라고 생각할 거야",
        "이런 실수로 회사에서 잘릴 수도 있어"
      ]
    },
    {
      question: "동료와 대화할 때 자주 든 생각은?",
      options: [
        "나만 모르는 게 있나봐",
        "자연스럽게 대화하고 있어",
        "분명 나를 이상하게 생각하고 있어",
        "다들 나보다 훨씬 똑똑해 보여"
      ]
    },
    {
      question: "업무가 잘 안 풀릴 때 한 생각은?",
      options: [
        "나는 정말 무능한 사람이야",
        "오늘은 컨디션이 안 좋은 날이네",
        "이 일은 원래 어려운 거야",
        "완벽하게 못하면 의미없어"
      ]
    }
  ];

  // 타로 카드들
  const tarotCards = [
    { title: "현실 체크", question: "이 상황이 1년 후에도 중요할까요?" },
    { title: "확률 계산", question: "최악의 시나리오가 실제로 일어날 확률은 몇 %일까요?" },
    { title: "친구 조언", question: "가장 친한 친구가 같은 상황이라면 뭐라고 조언해줄까요?" },
    { title: "증거 탐정", question: "이 생각을 뒷받침하는 구체적인 증거가 있나요?" },
    { title: "다른 관점", question: "이 상황을 완전히 다른 각도에서 보면 어떨까요?" }
  ];

  const employeeScreens = {
    main: {
      title: "나만의 직장선배",
      content: (
        <div className="min-h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* 사용자 상태 표시 */}
          <div className="p-3 sm:p-4 bg-white mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm sm:text-base">Lv.{userStats.level}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">안녕하세요! 👋</div>
                  <div className="text-xs sm:text-sm text-gray-600">{userStats.streak}일 연속 성장 중!</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">EXP</div>
                <div className="text-xs sm:text-sm font-bold">{userStats.exp}/{userStats.maxExp}</div>
                <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" 
                    style={{width: `${(userStats.exp/userStats.maxExp)*100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4">
            <button 
              onClick={() => setCurrentScreen('mypage')}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-3 sm:p-4 shadow-lg text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <User className="text-white mr-3" size={20} />
                  <div className="font-semibold text-sm sm:text-base">마이페이지</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Gift className="text-yellow-300 mr-1" size={14} />
                    <span className="text-xs sm:text-sm font-bold">1,250</span>
                  </div>
                </div>
              </div>
              <div className="text-xs sm:text-sm opacity-90">내 성장 현황 & 토큰샵</div>
            </button>

            {/* Grid layout for larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button 
                onClick={() => setCurrentScreen('checkin')}
                className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-lg border-l-4 border-blue-500 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MessageCircle className="text-blue-500 mr-3" size={20} />
                    <div className="font-semibold text-sm sm:text-base">3분 체크인</div>
                  </div>
                  <div className="flex items-center">
                    <Zap className="text-yellow-500 mr-1" size={14} />
                    <span className="text-xs font-bold">+10</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">오늘의 감정과 생각을 체크해보세요</div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('report')}
                className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-lg border-l-4 border-green-500 text-left"
              >
                <div className="flex items-center mb-2">
                  <BarChart3 className="text-green-500 mr-3" size={20} />
                  <div className="font-semibold text-sm sm:text-base">주간 리포트</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">이번 주 감정 여정과 성장 포인트</div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('goals')}
                className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-lg border-l-4 border-purple-500 text-left md:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center mb-2">
                  <Target className="text-purple-500 mr-3" size={20} />
                  <div className="font-semibold text-sm sm:text-base">목표 설정</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">함께 만드는 성장 계획</div>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <button 
                onClick={() => setCurrentScreen('cbt-academy')}
                className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-lg border-l-4 border-orange-500 text-left"
              >
                <div className="flex items-center mb-2">
                  <BookOpen className="text-orange-500 mr-3" size={20} />
                  <div className="font-semibold text-sm sm:text-base">CBT 아카데미</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">직장 인물도감 & 퀴즈</div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('community')}
                className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-lg border-l-4 border-pink-500 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="text-pink-500 mr-3" size={20} />
                    <div className="font-semibold text-sm sm:text-base">동료 소통</div>
                  </div>
                  {!userStats.canEmpathize && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded hidden sm:inline">7일 후 해금</span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">익명으로 고민을 나누고 위로받아요</div>
              </button>
            </div>
          </div>
        </div>
      )
    },
    checkin: {
      title: "3분 체크인",
      content: (
        <div className="min-h-full bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4">
          {/* 1단계: 감정 Range 선택 */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg mb-3 sm:mb-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Smile className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">오늘 하루 기분은 어땠나요?</div>
                <div className="text-xs text-gray-500">1단계: 감정 인식 (1/4)</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm font-medium mb-3">슬라이더로 선택해주세요 (1=매우 힘듦, 10=매우 좋음)</div>
              <div className="px-2">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={emotionRange}
                  onChange={(e) => setEmotionRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>😢 1</span>
                  <span className="font-bold text-blue-600 text-sm sm:text-base">{emotionRange}</span>
                  <span>😊 10</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">더 구체적으로 표현하고 싶다면? (선택사항)</div>
              <input 
                type="text" 
                placeholder="예: 피곤하지만 뿌듯해요"
                className="w-full p-3 border rounded-lg text-sm"
              />
            </div>
            
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-2">💙 즉시 피드백</div>
              <div className="text-sm text-blue-700">
                {emotionRange <= 3 && "힘든 감정을 표현해주셨군요. 이런 날이 있어도 괜찮습니다. 함께 차근차근 살펴봐요."}
                {emotionRange >= 4 && emotionRange <= 7 && "보통 정도의 하루셨군요. 평범한 일상도 소중한 경험이에요."}
                {emotionRange >= 8 && "좋은 기분이시네요! 이런 긍정적인 에너지를 잘 기억해두세요."}
              </div>
            </div>
          </div>
          
          {/* 2단계: 인지왜곡 탐지 퀴즈 */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">2단계: 생각 패턴 탐지</div>
              <button 
                onClick={() => setCurrentQuestionIndex((currentQuestionIndex + 1) % cognitiveQuestions.length)}
                className="flex items-center text-blue-600 text-xs"
              >
                <RefreshCw size={12} className="mr-1" />
                다른 질문
              </button>
            </div>
            <div className="text-sm text-gray-700 mb-3">
              {cognitiveQuestions[currentQuestionIndex].question}
            </div>
            <div className="space-y-2">
              {cognitiveQuestions[currentQuestionIndex].options.map((option, index) => (
                <button 
                  key={index}
                  className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 text-sm transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              💡 해당하는 상황이 없으면 "새로고침"을 눌러보세요
            </div>
          </div>
          
          {/* 3단계: 타로식 탐색 질문 */}
          <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
            <div className="text-sm font-medium mb-3">3단계: 마음 탐색 카드</div>
            <div className="text-xs text-gray-600 mb-3">카드를 선택해서 자신을 탐색해보세요</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tarotCards.slice(0, 3).map((card, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedCardIndex(index)}
                  className={`p-3 rounded-lg border-2 text-center transition-colors ${
                    selectedCardIndex === index 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-2xl mb-1">🎴</div>
                  <div className="text-xs font-medium">{card.title}</div>
                </button>
              ))}
            </div>
            
            {selectedCardIndex !== null && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-800 mb-2">
                  선택한 카드: {tarotCards[selectedCardIndex].title}
                </div>
                <div className="text-sm text-purple-700 mb-3">
                  {tarotCards[selectedCardIndex].question}
                </div>
                <textarea 
                  className="w-full p-3 border rounded text-sm" 
                  rows={3} 
                  placeholder="자유롭게 생각을 적어보세요..."
                />
              </div>
            )}
          </div>
        </div>
      )
    },
    report: {
      title: "주간 리포트",
      content: (
        <div className="min-h-full bg-white p-3 sm:p-4">
          {/* Large screen: 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* 감정 추이 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 lg:col-span-2">
              <h3 className="font-medium mb-3 flex items-center text-sm sm:text-base">
                <BarChart3 className="mr-2 text-blue-600" size={18} />
                이번 주 감정 여정
              </h3>
              
              {/* 이모지 캘린더 - Responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 text-sm mb-4">
                {[
                  { day: '월요일', emoji: Frown, color: 'text-red-500', score: '3.2' },
                  { day: '화요일', emoji: Meh, color: 'text-blue-500', score: '5.1' },
                  { day: '수요일', emoji: Meh, color: 'text-yellow-500', score: '6.3' },
                  { day: '목요일', emoji: Smile, color: 'text-green-500', score: '7.8' },
                  { day: '금요일', emoji: Smile, color: 'text-green-500', score: '8.2' }
                ].map((item, index) => (
                  <div key={index} className="flex sm:flex-col items-center sm:text-center justify-between sm:justify-center space-x-2 sm:space-x-0 sm:space-y-1">
                    <span className="text-xs sm:text-sm">{item.day}</span>
                    <div className="flex items-center space-x-1">
                      <item.emoji className={item.color} size={16} />
                      <span className="text-xs text-gray-600">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 간단한 그래프 */}
              <div className="bg-white rounded-lg p-3 mb-3">
                <div className="text-xs font-medium mb-2">주간 추이</div>
                <div className="flex items-end justify-between space-x-1 h-12">
                  <div className="bg-red-300 w-full max-w-8 rounded-t" style={{height: '32%'}}></div>
                  <div className="bg-blue-300 w-full max-w-8 rounded-t" style={{height: '51%'}}></div>
                  <div className="bg-yellow-300 w-full max-w-8 rounded-t" style={{height: '63%'}}></div>
                  <div className="bg-green-400 w-full max-w-8 rounded-t" style={{height: '78%'}}></div>
                  <div className="bg-green-500 w-full max-w-8 rounded-t" style={{height: '82%'}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>월</span><span>화</span><span>수</span><span>목</span><span>금</span>
                </div>
              </div>
              
              <div className="p-3 bg-white rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">🎉 성장 포인트</div>
                <div className="text-sm text-blue-700">목요일부터 지속적인 상승세! 주 후반 회복력이 뛰어나네요 👍</div>
              </div>
            </div>
            
            {/* 인지왜곡 카드 획득 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <Gift className="mr-2 text-purple-600" size={18} />
                새로운 카드 획득!
              </h3>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">🎴</div>
                <div className="font-bold text-purple-800 text-sm sm:text-base">파국화 팀장님 Lv.2</div>
                <div className="text-sm text-purple-600 mb-3">이번 주 가장 많이 발견된 패턴</div>
                <button className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
                  레벨업 퀴즈 도전!
                </button>
              </div>
            </div>
            
            {/* 목표 수행도 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <Target className="mr-2 text-green-600" size={18} />
                이번 주 목표 달성도
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">스트레스 관리</span>
                    <span className="text-sm font-bold text-green-600">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">심호흡법: 5일 중 4일 성공</div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('goals')}
                  className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium"
                >
                  다음 주 목표 함께 설정하기
                </button>
              </div>
            </div>
          </div>
          
          {/* 미래 지향적 알림 */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-3 sm:p-4 mt-4">
            <h3 className="font-medium mb-3 flex items-center text-sm">
              <AlertTriangle className="mr-2 text-orange-600" size={18} />
              다음 주 주의할 점
            </h3>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-orange-800 mb-2">⚠️ 패턴 감지</div>
              <div className="text-sm text-orange-700 mb-2">
                파국화 패턴이 3주 연속 나타나고 있어요
              </div>
              <div className="text-xs text-orange-600 mb-2">
                예상 리스크: 스트레스 누적 → 번아웃 가능성
              </div>
              <div className="text-xs text-green-700">
                💡 대응 방안: 다음 주 스트레스 관리 목표 강화 권장
              </div>
            </div>
          </div>
        </div>
      )
    },
    goals: {
      title: "함께 만드는 목표",
      content: (
        <div className="min-h-full bg-white p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {/* 1단계: 자기 탐색 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <MessageCircle className="mr-2 text-blue-600" size={18} />
                1단계: 함께 현재 상황 살펴보기
              </h3>
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm text-blue-800 mb-2">📊 지난주 데이터에서 발견한 점</div>
                <div className="text-sm text-blue-700 mb-2">
                  "파국화 패턴이 자주 나타났고, 특히 업무 스트레스 상황에서 두드러졌어요"
                </div>
                <div className="text-xs text-blue-600">어떤 패턴이 가장 눈에 띄시나요?</div>
              </div>
            </div>

            {/* 2단계: 우선순위 협의 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <Target className="mr-2 text-green-600" size={18} />
                2단계: 우선순위 함께 정하기
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm font-medium mb-2">어떤 영역이 지금 가장 중요한가요?</div>
                  <div className="space-y-2">
                    {['스트레스 관리', '동료 관계', '업무 집중력', '감정 조절', '워라밸 관리'].map((area, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <label className="flex items-center">
                          <input type="radio" name="priority" className="mr-2" />
                          <span className="text-sm">{area}</span>
                        </label>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">중요도</span>
                          <input type="range" min="1" max="10" className="w-16 sm:w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm font-medium mb-2">왜 이것이 중요한가요?</div>
                  <textarea 
                    className="w-full p-2 border rounded text-sm" 
                    rows={2}
                    placeholder="이유를 간단히 적어보세요..."
                  />
                </div>
              </div>
            </div>

            {/* 3단계: 전략 함께 선택 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <Award className="mr-2 text-purple-600" size={18} />
                3단계: 전략 함께 선택하기
              </h3>
              <div className="bg-white rounded-lg p-3">
                <div className="text-sm font-medium mb-3">어떤 방법을 시도해보고 싶나요?</div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {['호흡법 카드', '운동 카드', '대화 카드', '휴식 카드'].map((card, index) => (
                    <button key={index} className="p-3 border rounded-lg hover:bg-purple-50 text-center transition-colors">
                      <div className="text-2xl mb-1">🎴</div>
                      <div className="text-xs">{card}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">언제 해보고 싶나요?</div>
                  <input type="text" placeholder="예: 매일 오전 9시, 점심시간 등" className="w-full p-2 border rounded text-sm" />
                </div>
              </div>
            </div>

            {/* 4단계: 어려움 대비 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <Shield className="mr-2 text-orange-600" size={18} />
                4단계: 어려움 함께 대비하기
              </h3>
              <div className="space-y-2">
                {[
                  { scenario: "너무 바빠서 시간이 없어요", solution: "짧은 버전으로 조정" },
                  { scenario: "피곤해서 의욕이 없어요", solution: "더 쉬운 대안 준비" },
                  { scenario: "계속 깜빡해요", solution: "알림 설정 강화" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3">
                    <div className="text-sm font-medium text-orange-800 mb-1">
                      🔥 {item.scenario}
                    </div>
                    <div className="text-sm text-gray-700">→ Plan B: {item.solution}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    mypage: {
      title: "마이페이지",
      content: (
        <div className="min-h-full bg-gradient-to-br from-indigo-50 to-purple-100 p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {/* 사용자 정보 헤더 */}
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
                <div className="flex items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm sm:text-lg">Lv.{userStats.level}</span>
                  </div>
                  <div>
                    <div className="font-bold text-base sm:text-lg">김직장님</div>
                    <div className="text-sm text-gray-600">🔥 {userStats.streak}일 연속 성장 중!</div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="flex items-center sm:justify-end mb-1">
                    <Gift className="text-yellow-500 mr-1" size={16} />
                    <span className="font-bold text-lg">{userStats.tokens.toLocaleString()}</span>
                    <span className="text-sm text-gray-600 ml-1">토큰</span>
                  </div>
                  <button 
                    onClick={() => setCurrentScreen('token-shop')}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    토큰샵 🛒
                  </button>
                </div>
              </div>
              
              {/* 경험치 바 */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>EXP</span>
                  <span>{userStats.exp}/{userStats.maxExp}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-indigo-400 to-purple-500 h-3 rounded-full transition-all duration-500" 
                    style={{width: `${(userStats.exp/userStats.maxExp)*100}%`}}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">다음 레벨까지 {userStats.maxExp - userStats.exp} EXP</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* 이번 주 목표 */}
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Target className="text-purple-600 mr-2" size={18} />
                  이번 주 목표
                </h3>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-purple-800">{userStats.weeklyGoal}</span>
                    <span className="text-purple-600 font-bold">{userStats.goalProgress}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
                      style={{width: `${userStats.goalProgress}%`}}
                    ></div>
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    {userStats.goalProgress >= 70 ? '훌륭해요! 계속 이어가세요 🎉' : '조금만 더 힘내세요! 💪'}
                  </div>
                </div>
              </div>

              {/* 토큰 획득 현황 */}
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Zap className="text-yellow-600 mr-2" size={18} />
                  이번 주 토큰 획득
                </h3>
                <div className="space-y-2">
                  {[
                    { activity: '일일 체크인', amount: '+10', days: '7일', total: 70 },
                    { activity: '목표 달성', amount: '+50', days: '진행중', total: 0 },
                    { activity: '카드 레벨업', amount: '+25', days: '1회', total: 25 },
                    { activity: '동료 도움', amount: '+15', days: '2회', total: 30 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">{item.activity}</span>
                        <span className="text-gray-500 ml-2">({item.days})</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 font-bold mr-2">{item.amount}</span>
                        <span className="text-gray-600 text-xs">= {item.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span>이번 주 총 획득</span>
                    <span className="text-green-600">+125 토큰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 수집한 카드 도감 */}
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <BookOpen className="text-orange-600 mr-2" size={18} />
                내 카드 도감 ({userStats.collectedCards.length}/12)
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
                {userStats.collectedCards.map((card, index) => (
                  <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 text-center border border-orange-200">
                    <div className="text-xl sm:text-2xl mb-1">🎴</div>
                    <div className="text-xs font-semibold text-orange-800 leading-tight line-clamp-2">{card.name}</div>
                    <div className="text-xs text-orange-600">Lv.{card.level}</div>
                  </div>
                ))}
                {/* 빈 슬롯들 */}
                {Array.from({length: 12 - userStats.collectedCards.length}).map((_, index) => (
                  <div key={`empty-${index}`} className="bg-gray-100 rounded-lg p-2 text-center border border-gray-200">
                    <div className="text-xl sm:text-2xl mb-1 opacity-30">❓</div>
                    <div className="text-xs text-gray-400">미해금</div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setCurrentScreen('cbt-academy')}
                className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg text-sm font-medium"
              >
                카드 획득하러 가기
              </button>
            </div>
          </div>
        </div>
      )
    },
    'token-shop': {
      title: "토큰샵",
      content: (
        <div className="min-h-full bg-gradient-to-br from-yellow-50 to-orange-100 p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {/* 토큰 잔액 */}
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Gift className="text-yellow-500 mr-3" size={24} />
                  <div>
                    <div className="font-semibold">보유 토큰</div>
                    <div className="text-xs text-gray-600">1토큰 = 100원 상당</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600">{userStats.tokens.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">≈ {(userStats.tokens * 100).toLocaleString()}원</div>
                </div>
              </div>
            </div>

            {/* 카테고리 탭 */}
            <div className="flex space-x-2 mb-4 overflow-x-auto">
              {['음료/간식', '자기개발', '웰빙/휴식', '특별혜택'].map((category, index) => (
                <button key={index} className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
                  index === 0 ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600'
                }`}>
                  {category}
                </button>
              ))}
            </div>

            {/* 상품 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                { 
                  name: '아메리카노 쿠폰', 
                  price: 30, 
                  desc: '사내 카페에서 사용 가능',
                  icon: '☕',
                  available: true 
                },
                { 
                  name: '건강음료 세트', 
                  price: 80, 
                  desc: '비타민음료 + 이온음료 세트',
                  icon: '🥤',
                  available: true 
                },
                { 
                  name: '간식 박스', 
                  price: 120, 
                  desc: '견과류 + 과일 간식 세트',
                  icon: '🍓',
                  available: true 
                },
                { 
                  name: '프리미엄 원두', 
                  price: 200, 
                  desc: '스페셜티 원두 200g',
                  icon: '☕',
                  available: false 
                }
              ].map((item, index) => (
                <div key={index} className={`bg-white rounded-xl p-3 sm:p-4 shadow-lg ${!item.available ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-2xl sm:text-3xl mr-3">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-sm sm:text-base">{item.name}</div>
                        <div className="text-xs sm:text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <Gift className="text-yellow-500 mr-1" size={16} />
                        <span className="font-bold text-yellow-600">{item.price}</span>
                      </div>
                      <button 
                        className={`px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm font-medium ${
                          item.available && userStats.tokens >= item.price
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!item.available || userStats.tokens < item.price}
                      >
                        {!item.available ? '품절' : userStats.tokens >= item.price ? '구매' : '토큰 부족'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 구매 안내 */}
            <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
              <div className="text-sm text-blue-800 font-medium mb-1">💡 구매 안내</div>
              <div className="text-sm text-blue-700">
                • 구매한 쿠폰은 즉시 사용 가능합니다<br />
                • 토큰은 매일 체크인과 목표 달성으로 획득하세요<br />
                • 문의사항은 HR팀으로 연락해주세요
              </div>
            </div>
          </div>
        </div>
      )
    },
    'cbt-academy': {
      title: "CBT 아카데미",
      content: (
        <div className="min-h-full bg-white p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {/* 수집된 카드들 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-3 sm:p-4">
              <h3 className="font-medium mb-3 flex items-center text-sm">
                <Gift className="mr-2 text-purple-600" size={18} />
                직장 인물도감
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: "파국화 팀장님", level: 2, unlocked: true, description: "최악만 생각하는" },
                  { name: "흑백사고 부장님", level: 1, unlocked: true, description: "완벽하지 않으면 실패" },
                  { name: "마음읽기 대리님", level: 0, unlocked: false, description: "남의 마음을 추측하는" },
                  { name: "라벨링 과장님", level: 0, unlocked: false, description: "자신을 규정짓는" }
                ].map((card, index) => (
                  <div key={index} className={`p-3 rounded-lg border-2 ${card.unlocked ? 'bg-white border-purple-300' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="text-center">
                      <div className="text-3xl mb-2">{card.unlocked ? '🎴' : '❓'}</div>
                      <div className={`font-bold text-sm ${card.unlocked ? 'text-purple-800' : 'text-gray-400'}`}>
                        {card.unlocked ? card.name : '???'}
                      </div>
                      <div className={`text-xs ${card.unlocked ? 'text-purple-600' : 'text-gray-400'}`}>
                        {card.unlocked ? `Lv.${card.level}` : 'Lock'}
                      </div>
                      <div className={`text-xs mt-1 ${card.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {card.unlocked ? card.description : '미해금'}
                      </div>
                      {card.unlocked && (
                        <button className="mt-2 px-2 py-1 bg-purple-500 text-white rounded text-xs">
                          레벨업 퀴즈
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* 오늘의 퀴즈 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4">
                <h3 className="font-medium mb-3 flex items-center text-sm">
                  <BookOpen className="mr-2 text-blue-600" size={18} />
                  오늘의 CBT 퀴즈
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">Q. 다음 중 '파국화' 사고의 예시는?</div>
                  <div className="space-y-2">
                    {[
                      "실수했으니 다음엔 더 조심해야지",
                      "이번 실수로 회사에서 잘릴 거야",
                      "모든 사람이 나를 싫어한다",
                      "완벽하지 않으면 의미없어"
                    ].map((option, index) => (
                      <button key={index} className="w-full p-2 text-left border rounded hover:bg-blue-50 text-sm transition-colors">
                        {index + 1}. {option}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:justify-between text-xs">
                    <div className="text-gray-500 mb-1 sm:mb-0">정답 시 파국화 팀장님 경험치 +50</div>
                    <div className="text-blue-600">2/3 문제 완료</div>
                  </div>
                </div>
              </div>

              {/* CBT 기본 개념 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4">
                <h3 className="font-medium mb-3 flex items-center text-sm">
                  <Award className="mr-2 text-green-600" size={18} />
                  CBT 기본 개념
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "생각 → 감정 → 행동", status: "완료", progress: 100 },
                    { title: "인지왜곡 종류", status: "진행중", progress: 60 },
                    { title: "감정 조절 기법", status: "잠금", progress: 0 }
                  ].map((lesson, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{lesson.title}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          lesson.status === '완료' ? 'bg-green-200 text-green-800' :
                          lesson.status === '진행중' ? 'bg-blue-200 text-blue-800' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {lesson.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            lesson.status === '완료' ? 'bg-green-500' :
                            lesson.status === '진행중' ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          style={{width: `${lesson.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    community: {
      title: "동료 소통",
      content: (
        <div className="min-h-full bg-white p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {/* 권한 안내 */}
            {!userStats.canEmpathize && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
                <div className="text-sm font-medium text-yellow-800 mb-1">🔒 기능 해금 안내</div>
                <div className="text-sm text-yellow-700">
                  • 공감하기: {7 - userStats.streak}일 후 해금<br />
                  • 조언하기: 30일 스트릭 후 해금
                </div>
              </div>
            )}

            {/* 카테고리 탭 */}
            <div className="flex space-x-2 mb-4 overflow-x-auto">
              {['업무 스트레스', '동료 관계', '상사/후배', '워라밸', '커리어', '기타'].map((category, index) => (
                <button key={index} className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap ${
                  index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {category}
                </button>
              ))}
            </div>

            {/* 고민 작성 버튼 */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-3 sm:p-4 text-left">
              <div className="font-medium mb-1">💭 고민 나누기</div>
              <div className="text-sm opacity-90">익명으로 고민을 공유하고 위로받아보세요</div>
            </button>
            
            {/* 게시물들 */}
            <div className="space-y-4">
              {[
                {
                  content: "프로젝트 마감이 다가오는데 계속 실수를 하게 돼요. 완벽하게 해야 한다는 압박감이 너무 커서 오히려 집중이 안 되는 것 같아요.",
                  empathy: 12,
                  advice: 3,
                  timeAgo: "2시간 전"
                },
                {
                  content: "팀장님과의 소통이 어려워요. 피드백을 받을 때마다 위축되고, 다음에는 뭘 해야 할지 확신이 서지 않아요.",
                  empathy: 8,
                  advice: 2,
                  timeAgo: "4시간 전"
                },
                {
                  content: "재택근무를 하다 보니 동료들과 점점 멀어지는 느낌이에요. 업무적인 소통은 하지만 인간적인 유대감이 부족해서 외로워요.",
                  empathy: 15,
                  advice: 5,
                  timeAgo: "6시간 전"
                }
              ].map((post, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                        <div className="text-sm font-medium">익명의 동료</div>
                        <div className="text-xs text-gray-500">{post.timeAgo}</div>
                      </div>
                      <div className="text-sm text-gray-700 mb-3">
                        {post.content}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <button 
                          className={`flex items-center justify-center space-x-1 px-3 py-1 rounded-full text-xs ${
                            userStats.canEmpathize 
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!userStats.canEmpathize}
                        >
                          <ThumbsUp size={12} />
                          <span>공감해요 ({post.empathy})</span>
                        </button>
                        <button 
                          className={`flex items-center justify-center space-x-1 px-3 py-1 rounded-full text-xs ${
                            userStats.canGiveAdvice 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!userStats.canGiveAdvice}
                        >
                          <MessageCircle size={12} />
                          <span>조언하기 ({post.advice})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 베스트 조언자 안내 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3 sm:p-4">
              <div className="flex items-center mb-2">
                <Star className="text-yellow-500 mr-2" size={18} />
                <span className="font-medium text-sm">이번 주 베스트 조언자</span>
              </div>
              <div className="text-sm text-gray-700">
                따뜻하고 실용적인 조언으로 많은 동료들에게 도움을 주세요.<br />
                <span className="text-yellow-600 font-medium">매주 금요일 선정 & 특별 보상 지급!</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const renderMobileFrame = (screen) => (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto">
      {/* Mobile first design with responsive scaling */}
      <div className="bg-black rounded-none sm:rounded-3xl p-0 sm:p-1">
        <div className="bg-white rounded-none sm:rounded-3xl overflow-hidden min-h-screen sm:min-h-96">
          {/* Status Bar - only show on mobile view */}
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center text-xs sm:hidden">
            <span className="font-medium">9:41</span>
            <div className="flex space-x-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-4 h-2 bg-green-400 rounded-sm"></div>
              <div className="w-4 h-2 bg-green-300 rounded-sm"></div>
            </div>
          </div>
          
          {/* Header */}
          <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              {currentScreen !== 'main' && (
                <button 
                  onClick={() => setCurrentScreen('main')}
                  className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h1 className="font-semibold text-lg sm:text-xl">{screen.title}</h1>
            </div>
            
            {currentScreen === 'main' && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{userStats.streak}</span>
                </div>
                <Zap className="text-yellow-500" size={16} />
                {/* Mobile menu button for larger screens */}
                <button 
                  className="md:hidden p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="bg-white w-64 h-full p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">메뉴</h2>
                  <button onClick={() => setIsMenuOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {['main', 'checkin', 'report', 'goals', 'mypage'].map((screenName) => (
                    <button
                      key={screenName}
                      onClick={() => {
                        setCurrentScreen(screenName);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-gray-100"
                    >
                      {employeeScreens[screenName].title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Content with responsive height */}
          <div className="min-h-screen sm:min-h-96 sm:max-h-screen sm:overflow-y-auto">
            {screen.content}
          </div>
          
          {/* Bottom Navigation (only on main screen and mobile) */}
          {currentScreen === 'main' && (
            <div className="bg-white border-t px-4 py-2 flex justify-center sm:hidden">
              <button className="flex flex-col items-center py-2">
                <Home size={20} className="text-blue-500" />
                <span className="text-xs text-blue-500 mt-1">홈</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (userType === 'landing') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-6 sm:mb-8 max-w-4xl">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-indigo-800">🧠 나만의 직장선배</div>
          <div className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6">CTRS-D 기반 CBT 디지털 웰빙 플랫폼</div>
          <div className="text-base sm:text-lg text-gray-600">통합 사용자 앱을 체험해보세요!</div>
        </div>
        
        <div className="w-full max-w-6xl">
          <button 
            onClick={() => {setUserType('employee'); setCurrentScreen('main');}}
            className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <User className="text-blue-500 mr-0 sm:mr-3 mb-2 sm:mb-0" size={32} />
              <div className="font-bold text-xl sm:text-2xl text-center sm:text-left">직원용 통합 앱</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left text-gray-700 text-sm sm:text-base">
              <div>• 3분 체크인 (감정 Range + 인지왜곡 탐지)</div>
              <div>• 주간 리포트 (감정 추이 + 카드 수집)</div>
              <div>• CTRS-D 기반 협력적 목표 설정</div>
              <div>• CBT 아카데미 (직장 인물도감)</div>
              <div>• 레벨별 권한 동료 소통</div>
              <div>• 스트릭 & 경험치 시스템</div>
            </div>
          </button>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center max-w-2xl">
          <div className="text-sm text-gray-600 mb-4">
            ✨ CTRS-D 11개 영역 완전 충족 ✨<br />
            협력적 목표 설정 • 즉시 피드백 • 길잡이식 탐색 • 실행 지원
          </div>
          <button 
            onClick={() => setUserType('landing')}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors text-sm sm:text-base"
          >
            다시 선택하기
          </button>
        </div>
      </div>
    );
  }

  const currentScreenData = employeeScreens[currentScreen];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 flex flex-col">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <button 
          onClick={() => {setUserType('landing'); setCurrentScreen('main');}}
          className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          메인으로 돌아가기
        </button>
        <div className="flex items-center justify-center sm:justify-end space-x-2">
          <span className="text-base sm:text-lg font-semibold text-gray-700">나만의 직장선배</span>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">Lv.{userStats.level}</span>
            </div>
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{userStats.streak}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        {renderMobileFrame(currentScreenData)}
      </div>
    </div>
  );
};

export default MobileApp;