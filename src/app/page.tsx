'use client';

import { useState } from 'react';
import { ChevronRight, Sparkles, Heart, Star, BookOpen, ChevronLeft, Quote } from 'lucide-react';

// Dados do quiz
const questions = [
  {
    id: 1,
    question: "Como você se sente ao acordar pela manhã?",
    options: [
      "Cansada, mesmo depois de dormir",
      "Confusa, com muitos pensamentos",
      "Intuitiva, mas sem clareza"
    ]
  },
  {
    id: 2,
    question: "Como você reage quando alguém te critica?",
    options: [
      "Me fecho e guardo mágoa",
      "Questiono se estou errada",
      "Finjo que não me afeta"
    ]
  },
  {
    id: 3,
    question: "O que você sente em relação ao seu futuro?",
    options: [
      "Medo de não conseguir realizar meus sonhos",
      "Confusão sobre qual caminho seguir",
      "Esperança, mas sem plano concreto"
    ]
  },
  {
    id: 4,
    question: "Como você lida com suas emoções intensas?",
    options: [
      "Reprimo e finjo que está tudo bem",
      "Me perco nelas e não consigo controlar",
      "Evito situações que possam me desestabilizar"
    ]
  },
  {
    id: 5,
    question: "Como você se vê nos relacionamentos?",
    options: [
      "Dou mais do que recebo",
      "Tenho medo de me entregar completamente",
      "Busco validação constante do outro"
    ]
  },
  {
    id: 6,
    question: "O que você sente sobre sua feminilidade?",
    options: [
      "Desconectada, como se não fosse suficiente",
      "Confusa sobre o que significa ser mulher hoje",
      "Poderosa, mas sem saber como expressar"
    ]
  },
  {
    id: 7,
    question: "Como você reage ao silêncio e à solidão?",
    options: [
      "Evito a todo custo, me mantenho ocupada",
      "Sinto ansiedade e pensamentos negativos",
      "Busco, mas não sei o que fazer com ela"
    ]
  },
  {
    id: 8,
    question: "O que você faz quando se sente perdida?",
    options: [
      "Busco respostas fora de mim",
      "Me paraliso e não consigo agir",
      "Finjo que está tudo sob controle"
    ]
  },
  {
    id: 9,
    question: "Como você se relaciona com seu corpo?",
    options: [
      "Crítica constante, nunca estou satisfeita",
      "Desconectada, como se não fosse meu",
      "Aceito, mas sem celebrar"
    ]
  },
  {
    id: 10,
    question: "O que você mais deseja neste momento?",
    options: [
      "Paz interior e clareza mental",
      "Conexão profunda comigo mesma",
      "Coragem para ser quem realmente sou"
    ]
  }
];

const profiles = {
  confusa: {
    title: "A Mulher Confusa",
    subtitle: "Você não está quebrada. Você está em transição.",
    description: "Você sente que há algo maior dentro de você, mas não consegue acessar. Seus pensamentos são intensos, suas emoções são profundas, mas falta clareza. Você está no limiar de uma grande transformação."
  },
  bloqueada: {
    title: "A Mulher Bloqueada",
    subtitle: "Você sente, mas não consegue expressar.",
    description: "Há uma força poderosa dentro de você, mas algo a mantém presa. Você se protege tanto que acabou se isolando da sua própria essência. É hora de desbloquear."
  },
  despertar: {
    title: "A Mulher em Despertar",
    subtitle: "Você está pronta para a transformação.",
    description: "Você já sente a mudança acontecendo. Há momentos de clareza, mas ainda falta consistência. Você está no caminho certo, só precisa das ferramentas certas para acelerar seu despertar."
  }
};

export default function DespertaApp() {
  const [screen, setScreen] = useState<'home' | 'quiz' | 'result' | 'sales'>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [profile, setProfile] = useState<keyof typeof profiles>('confusa');

  const handleStartQuiz = () => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular perfil baseado nas respostas
      const sum = newAnswers.reduce((a, b) => a + b, 0);
      if (sum <= 10) setProfile('bloqueada');
      else if (sum <= 20) setProfile('confusa');
      else setProfile('despertar');
      
      setScreen('result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      // Remove a última resposta e volta para a pergunta anterior
      setAnswers(answers.slice(0, -1));
      setCurrentQuestion(currentQuestion - 1);
    } else {
      // Se estiver na primeira pergunta, volta para a tela inicial
      setScreen('home');
      setAnswers([]);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1ED] via-[#FAF8F6] to-[#F5F1ED]">
      <div className="max-w-4xl mx-auto">
        
        {/* Tela Inicial */}
        {screen === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 animate-fade-in p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-[#C9A27C]" />
                <h1 className="text-2xl font-light tracking-wider text-[#8B6F5C]">
                  DESPERTA
                </h1>
                <Sparkles className="w-6 h-6 text-[#C9A27C]" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-light leading-tight text-[#5C4A3D] px-4">
                Descubra o que está bloqueando sua vida emocional
              </h2>
              
              <p className="text-[#9B8577] text-lg font-light mt-4 px-6">
                Quiz do Desbloqueio Interior
              </p>
            </div>

            <div className="w-full max-w-md px-8 space-y-4 mt-12">
              <button
                onClick={handleStartQuiz}
                className="w-full bg-gradient-to-r from-[#D4A574] to-[#C9A27C] text-white py-5 px-8 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                Iniciar meu diagnóstico
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <p className="text-[#B39C8F] text-sm font-light">
                10 perguntas • 3 minutos
              </p>
            </div>
          </div>
        )}

        {/* Tela do Quiz */}
        {screen === 'quiz' && (
          <div className="flex flex-col min-h-screen justify-center animate-fade-in p-4">
            <div className="max-w-2xl mx-auto w-full">
              {/* Barra de Progresso */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-[#9B8577] font-light">
                    Pergunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <span className="text-sm text-[#9B8577] font-light">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E8D5C4] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4A574] to-[#C9A27C] transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Pergunta */}
              <div className="space-y-8">
                <h3 className="text-2xl sm:text-3xl font-light text-[#5C4A3D] leading-relaxed text-center px-4">
                  {questions[currentQuestion].question}
                </h3>

                {/* Opções */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full bg-white/60 backdrop-blur-sm border border-[#E8D5C4] text-[#5C4A3D] py-5 px-6 rounded-2xl text-left font-light hover:bg-white hover:border-[#D4A574] hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Voltar */}
              <div className="mt-8">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-[#9B8577] hover:text-[#7A6A5C] transition-colors duration-300 font-light"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Voltar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tela de Resultado */}
        {screen === 'result' && (
          <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 animate-fade-in p-4">
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A574] to-[#C9A27C] flex items-center justify-center shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[#9B8577] text-sm font-light tracking-wider uppercase">
                  Seu Perfil
                </p>
                <h2 className="text-4xl font-light text-[#5C4A3D]">
                  {profiles[profile].title}
                </h2>
                <p className="text-xl text-[#C9A27C] font-light italic">
                  {profiles[profile].subtitle}
                </p>
              </div>

              <p className="text-[#7A6A5C] text-lg font-light leading-relaxed max-w-md mx-auto mt-6">
                {profiles[profile].description}
              </p>
            </div>

            <div className="w-full max-w-md space-y-4 mt-12">
              <button
                onClick={() => setScreen('sales')}
                className="w-full bg-gradient-to-r from-[#D4A574] to-[#C9A27C] text-white py-5 px-8 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                Quero acessar meu guia de transformação
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Página de Vendas do E-book */}
        {screen === 'sales' && (
          <div className="min-h-screen py-12 sm:py-16 animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-16">
              
              {/* Header Principal */}
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A574] to-[#C9A27C] flex items-center justify-center shadow-lg">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#5C4A3D] leading-tight">
                  O Caminho de Volta Para Si
                </h1>
                
                <p className="text-xl sm:text-2xl text-[#9B8577] font-light italic leading-relaxed max-w-2xl mx-auto">
                  O e-book que desperta a mulher que você nunca deixou de ser.
                </p>
                
                <p className="text-lg text-[#7A6A5C] font-light leading-relaxed max-w-2xl mx-auto pt-4">
                  Um guia íntimo para mulheres que se perderam tentando agradar o mundo — e agora estão prontas para voltar para casa.
                </p>
              </div>

              {/* Sessão 1 - Dor Silenciosa */}
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-[#E8D5C4] space-y-6">
                <div className="space-y-4">
                  <p className="text-[#7A6A5C] text-lg font-light leading-relaxed">
                    Você acorda cansada. Não importa quantas horas dormiu, o cansaço é emocional. É aquele peso que ninguém vê, mas que você carrega todos os dias.
                  </p>
                  
                  <p className="text-[#7A6A5C] text-lg font-light leading-relaxed">
                    Você se desconectou de si mesma. Não sabe mais o que sente de verdade. Vive no automático, cumprindo papéis, atendendo expectativas, sendo tudo para todos — menos para você.
                  </p>
                  
                  <p className="text-[#7A6A5C] text-lg font-light leading-relaxed">
                    E mesmo fazendo tudo certo, há um vazio. Uma sensação de que algo essencial está faltando. Como se você tivesse se perdido no caminho e não soubesse mais como voltar.
                  </p>
                </div>
              </div>

              {/* Sessão 2 - Virada */}
              <div className="text-center space-y-6 py-8">
                <div className="inline-block">
                  <Sparkles className="w-12 h-12 text-[#C9A27C] mx-auto mb-4" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-light text-[#5C4A3D] leading-tight">
                  Este e-book não é sobre se tornar alguém nova
                </h2>
                
                <div className="space-y-4 max-w-2xl mx-auto">
                  <p className="text-[#7A6A5C] text-lg font-light leading-relaxed">
                    É sobre <span className="text-[#C9A27C] italic">lembrar quem você é</span>. Sobre se escutar novamente. Sobre reconstruir, com delicadeza e profundidade, a relação com o seu próprio valor.
                  </p>
                  
                  <p className="text-[#7A6A5C] text-lg font-light leading-relaxed">
                    É um convite para voltar para casa. Para dentro de você. Para o lugar onde tudo sempre esteve — esperando que você voltasse.
                  </p>
                </div>
              </div>

              {/* Sessão 3 - O que ela vai encontrar */}
              <div className="bg-gradient-to-br from-[#FAF8F6] to-[#F5F1ED] rounded-3xl p-8 sm:p-10 border border-[#E8D5C4] space-y-8">
                <h3 className="text-2xl sm:text-3xl font-light text-[#5C4A3D] text-center">
                  O que você vai encontrar neste e-book
                </h3>
                
                <div className="space-y-5">
                  {[
                    { icon: Heart, text: "Exercícios de presença para reconectar com o momento presente" },
                    { icon: Sparkles, text: "Reflexões profundas que tocam a essência do feminino" },
                    { icon: Star, text: "Práticas de reconexão com sua intuição e sabedoria interior" },
                    { icon: BookOpen, text: "Códigos de consciência feminina para despertar sua força autêntica" },
                    { icon: Heart, text: "Perguntas que despertam — e que só você pode responder" }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#C9A27C] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-[#5C4A3D] font-light text-lg pt-1.5">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sessão 4 - Depoimento */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-[#E8D5C4] space-y-6">
                <div className="flex justify-center mb-4">
                  <Quote className="w-12 h-12 text-[#C9A27C]" />
                </div>
                
                <p className="text-[#7A6A5C] text-lg font-light leading-relaxed italic text-center">
                  "Eu não sabia que estava tão distante de mim mesma até começar a ler. Cada página era como um espelho mostrando partes de mim que eu tinha esquecido. Chorei, respirei fundo, e pela primeira vez em anos, me senti em casa dentro do meu próprio corpo. Este e-book não mudou minha vida — ele me devolveu a mim mesma."
                </p>
                
                <p className="text-[#9B8577] text-sm font-light text-center pt-4">
                  — Mariana, 34 anos
                </p>
              </div>

              {/* Sessão 5 - CTA Final */}
              <div className="text-center space-y-8 py-8">
                <div className="space-y-4">
                  <p className="text-2xl sm:text-3xl font-light text-[#5C4A3D] leading-relaxed">
                    Você não está atrasada.
                  </p>
                  <p className="text-2xl sm:text-3xl font-light text-[#5C4A3D] leading-relaxed">
                    Você só estava distante de si.
                  </p>
                  <p className="text-2xl sm:text-3xl font-light text-[#C9A27C] leading-relaxed italic">
                    E agora, você pode voltar.
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4 pt-8">
                  <button
                    onClick={() => alert('Redirecionando para pagamento...')}
                    className="w-full bg-gradient-to-r from-[#D4A574] to-[#C9A27C] text-white py-6 px-8 rounded-full text-xl font-light tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Quero começar meu retorno agora
                  </button>
                  
                  <p className="text-[#B39C8F] text-sm font-light">
                    Acesso imediato • Pagamento seguro • Garantia de 7 dias
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
