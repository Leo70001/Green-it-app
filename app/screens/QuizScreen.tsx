import { quizQuestionsBank } from "@/app/data/quizData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type QuizResult = {
    id: string;
    date: string;
    score: {
      correct: number;
      total: number;
    };
    themes: string[];
    questions: typeof quizQuestionsBank;
    userAnswers: number[];
};

const allThemes = quizQuestionsBank.map(q => q.theme);
const availableThemes = [...new Set(allThemes)].sort();

export default function QuizScreen() {
  const [step, setStep] = useState<"theme" | "quiz" | "result" | "history" | "historyDetail">("theme");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<QuizResult | null>(null);
  
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [displayedQuestions, setDisplayedQuestions] = useState<typeof quizQuestionsBank>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [themeStats, setThemeStats] = useState<Record<string, { total: number; correct: number }>>({});
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);

  const loadNewQuizQuestions = useCallback(() => {
    const filtered = quizQuestionsBank.filter((q) =>
      selectedThemes.includes(q.theme)
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    setDisplayedQuestions(shuffled);
    setSelectedAnswers([]);
    setSubmitted(false);
    setThemeStats({});
  }, [selectedThemes]);

  useEffect(() => {
    if (step === "quiz" && displayedQuestions.length === 0)
      loadNewQuizQuestions();
  }, [step, loadNewQuizQuestions, displayedQuestions]);
  
  const handleThemeSelect = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };
  
  const startQuiz = () => {
    if (selectedThemes.length === 0) {
      alert("Veuillez sélectionner au moins un thème.");
    } else {
      setStep("quiz");
    }
  };
  
  const selectOption = (qIndex: number, oIndex: number) => {
    if (!submitted) {
      const updated = [...selectedAnswers];
      updated[qIndex] = oIndex;
      setSelectedAnswers(updated);
    }
  };

  const handleSubmit = async () => {
    if (
      selectedAnswers.length !== displayedQuestions.length ||
      selectedAnswers.some((ans) => ans === undefined)
    ) {
      alert("Veuillez répondre à toutes les questions.");
      return;
    }
    
    let correctAnswersCount = 0;
    const currentThemeStats: Record<string, { total: number; correct: number }> = {};
    displayedQuestions.forEach((q, i) => {
      const theme = q.theme;
      if (!currentThemeStats[theme]) currentThemeStats[theme] = { total: 0, correct: 0 };
      currentThemeStats[theme].total += 1;
      if (q.answerIndex === selectedAnswers[i]) {
        currentThemeStats[theme].correct += 1;
        correctAnswersCount++;
      }
    });
    setThemeStats(currentThemeStats)

    const newResult: QuizResult = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        score: {
            correct: correctAnswersCount,
            total: displayedQuestions.length,
        },
        themes: selectedThemes,
        questions: displayedQuestions,
        userAnswers: selectedAnswers,
    };

    try {
        const existingHistoryJSON = await AsyncStorage.getItem("quizHistory");
        const existingHistory: QuizResult[] = existingHistoryJSON ? JSON.parse(existingHistoryJSON) : [];
        const updatedHistory = [newResult, ...existingHistory];
        await AsyncStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
    } catch (e) {
        console.error("Erreur lors de la sauvegarde de l'historique.", e);
    }
    
    setSubmitted(true);
    setStep("result");
  };

  const showHistory = async () => {
    try {
        const historyJSON = await AsyncStorage.getItem("quizHistory");
        const history = historyJSON ? JSON.parse(historyJSON) : [];
        setQuizHistory(history);
        setStep("history");
    } catch (e) {
        console.error("Erreur lors du chargement de l'historique.", e);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadNewQuizQuestions();
      setRefreshing(false);
    }, 1000);
  }, [loadNewQuizQuestions]);

  const getBestAndWorstThemes = () => {
    const sorted = Object.entries(themeStats).sort((a, b) => {
      const aRate = a[1].correct / a[1].total;
      const bRate = b[1].correct / b[1].total;
      return bRate - aRate;
    });
    return {
      best: sorted[0],
      worst: sorted[sorted.length - 1],
    };
  };

  const handleBackToThemes = () => {
    setStep("theme");
    setDisplayedQuestions([]);
    setSelectedAnswers([]);
    setSubmitted(false);
  };
  
  const renderHistoryItem = ({ item }: { item: QuizResult }) => (
    <TouchableOpacity
        style={styles.historyItem}
        disabled={!item.questions}
        onPress={() => {
            setSelectedHistoryItem(item);
            setStep("historyDetail");
        }}
    >
        <Text style={styles.historyDate}>
            {new Date(item.date).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
        </Text>
        <Text style={styles.historyScore}>
            Score : {item.score.correct} / {item.score.total}
        </Text>
        <Text style={styles.historyThemes}>
            Thèmes : {item.themes.join(', ')}
        </Text>
        {!item.questions && (
            <Text style={styles.historyDetailNotAvailable}>Détails non disponibles</Text>
        )}
    </TouchableOpacity>
  );
  
  const renderContent = () => {
    // Le contenu de chaque étape est rendu dans une ScrollView ou FlatList
    // pour assurer un défilement correct et indépendant.
    switch (step) {
      case "theme":
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Green Quiz</Text>
            <TouchableOpacity style={styles.topSecondaryButton} onPress={showHistory}>
              <Text style={styles.secondaryButtonText}>Voir mon historique</Text>
            </TouchableOpacity>
            <Text style={styles.instructions}>Choisissez un ou plusieurs thèmes pour commencer :</Text>
            {availableThemes.map((theme) => (
              <TouchableOpacity key={theme} style={[styles.option, selectedThemes.includes(theme) && styles.selectedOption]} onPress={() => handleThemeSelect(theme)}>
                <Text style={styles.optionText}>{theme}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.submitButton} onPress={startQuiz}>
              <Text style={styles.submitText}>Commencer le quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={showHistory}>
              <Text style={styles.secondaryButtonText}>Voir mon historique</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      case "quiz":
      case "result":
      case "history":
      case "historyDetail":
        return (
          <FlatList
            data={[{ key: 'content' }]}
            keyExtractor={item => item.key}
            contentContainerStyle={styles.scrollContent}
            refreshControl={step === 'quiz' ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" /> : undefined}
            renderItem={() => {
              if (step === 'quiz') {
                return (
                  <View>
                    {!submitted && (
                      <TouchableOpacity style={styles.backButton} onPress={handleBackToThemes}>
                        <Text style={styles.backButtonText}>‹ Retour aux thèmes</Text>
                      </TouchableOpacity>
                    )}
                     {submitted && (
                       <TouchableOpacity style={[styles.secondaryButton, { marginBottom: 20 }]} onPress={() => setStep("result")}>
                         <Text style={styles.secondaryButtonText}>Voir les résultats</Text>
                       </TouchableOpacity>
                     )}
                     {displayedQuestions.map((q, qIndex) => (
                       <View key={qIndex} style={styles.questionBlock}>
                         <Text style={styles.question}>{q.question}</Text>
                         {q.options.map((option, oIndex) => {
                           const isSelected = selectedAnswers[qIndex] === oIndex;
                           const isCorrect = submitted && oIndex === q.answerIndex;
                           const isWrong = submitted && isSelected && !isCorrect;
                           return (
                             <TouchableOpacity key={oIndex} style={[styles.option, isSelected && styles.selectedOption, isCorrect && styles.correctOption, isWrong && styles.wrongOption]} onPress={() => selectOption(qIndex, oIndex)} disabled={submitted}>
                               <Text style={styles.optionText}>{option}</Text>
                             </TouchableOpacity>
                           );
                         })}
                         {submitted && (
                           <Text style={styles.explanationText}>{q.explanation}</Text>
                         )}
                       </View>
                     ))}
                     {!submitted && (
                       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                         <Text style={styles.submitText}>Soumettre</Text>
                       </TouchableOpacity>
                     )}
                  </View>
                );
              }
              if (step === 'result') {
                 return (
                   <View>
                     <Text style={styles.title}>Résultats du quiz</Text>
                     <Text style={styles.resultText}>Score : {selectedAnswers.filter((a, i) => a === displayedQuestions[i]?.answerIndex).length} / {displayedQuestions.length}</Text>
                     {Object.keys(themeStats).length > 1 && (() => {
                       const { best, worst } = getBestAndWorstThemes();
                       return (
                         <>
                           <Text style={styles.resultText}>✅ Thème le plus réussi : {best[0]} ({best[1].correct} / {best[1].total})</Text>
                           <Text style={styles.resultText}>❌ Thème le moins réussi : {worst[0]} ({worst[1].correct} / {worst[1].total})</Text>
                         </>
                       );
                     })()}
                     <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep("quiz")}>
                       <Text style={styles.secondaryButtonText}>Revoir le quiz et les explications</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.submitButton} onPress={() => { setStep("theme"); setSelectedThemes([]); setDisplayedQuestions([]); }}>
                       <Text style={styles.submitText}>Retourner à l'accueil</Text>
                     </TouchableOpacity>
                   </View>
                 );
              }
              if (step === 'history') {
                return (
                  <View>
                    <TouchableOpacity style={styles.backButton} onPress={() => setStep("theme")}>
                      <Text style={styles.backButtonText}>‹ Retour à l'accueil</Text>
                    </TouchableOpacity>
                    <FlatList 
                      data={quizHistory} 
                      renderItem={renderHistoryItem} 
                      keyExtractor={(item) => item.id}
                      ListHeaderComponent={<Text style={styles.title}>Mon Historique</Text>}
                      ListEmptyComponent={<Text style={styles.resultText}>Vous n'avez pas encore terminé de quiz.</Text>}
                    />
                  </View>
                );
              }
              if (step === 'historyDetail' && selectedHistoryItem) {
                return (
                  <View>
                    <TouchableOpacity style={styles.backButton} onPress={() => setStep("history")}>
                      <Text style={styles.backButtonText}>‹ Retour à l'historique</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Détail du Quiz</Text>
                    <Text style={styles.historyDate_detail}>
                        Quiz du {new Date(selectedHistoryItem.date).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
                    </Text>
                    {selectedHistoryItem.questions.map((q, qIndex) => (
                        <View key={qIndex} style={styles.questionBlock}>
                            <Text style={styles.question}>{q.question}</Text>
                            {q.options.map((option, oIndex) => {
                                const userAnswer = selectedHistoryItem.userAnswers[qIndex];
                                const isCorrect = q.answerIndex === oIndex;
                                const isWrong = userAnswer === oIndex && !isCorrect;

                                return(
                                    <View 
                                        key={oIndex}
                                        style={[
                                            styles.option,
                                            isCorrect && styles.correctOption,
                                            isWrong && styles.wrongOption,
                                        ]}
                                    >
                                        <Text style={styles.optionText}>{option}</Text>
                                    </View>
                                );
                            })}
                            <Text style={styles.explanationText}>{q.explanation}</Text>
                        </View>
                    ))}
                  </View>
                );
              }
              return null;
            }}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#282929"  // <-- COULEUR MISE À JOUR
    },
    scrollContent: { 
        paddingHorizontal: 16,
        paddingTop: 32, 
        paddingBottom: 60,
        backgroundColor: "#282929" 
    },
    title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10, textAlign: "center" },
    instructions: { fontSize: 16, color: '#ddd', textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },
    questionBlock: { marginBottom: 24, backgroundColor: '#3A3B3B', padding: 12, borderRadius: 8},
    question: { color: "white", fontSize: 18, marginBottom: 12, fontWeight: '600' },
    option: { backgroundColor: "#4C4D4D", padding: 12, borderRadius: 8, marginBottom: 8 },
    optionText: { color: "white", fontSize: 16 },
    selectedOption: { borderWidth: 2, borderColor: "green" },
    correctOption: { backgroundColor: "#2E7D32" }, 
    wrongOption: { backgroundColor: "#C62828" }, 
    submitButton: { marginTop: 20, backgroundColor: "green", padding: 14, borderRadius: 10, alignItems: "center" },
    submitText: { fontWeight: "bold", fontSize: 16, color: "#2A3836" },
    resultText: { color: "white", fontSize: 18, textAlign: "center", marginTop: 12, lineHeight: 28 },
    backButton: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, marginBottom: 15 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    secondaryButton: { marginTop: 12, backgroundColor: '#555', padding: 14, borderRadius: 10, alignItems: 'center' },
    secondaryButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    topSecondaryButton: {
      alignSelf: 'center',
      backgroundColor: '#555',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 20, 
    },
    historyItem: { backgroundColor: '#444', padding: 15, borderRadius: 10, marginBottom: 10 },
    historyDate: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    historyScore: { color: '#ddd', fontSize: 14, marginTop: 5 },
    historyThemes: { color: '#bbb', fontSize: 12, fontStyle: 'italic', marginTop: 5 },
    historyDetailNotAvailable: { color: '#999', fontSize: 12, marginTop: 8, textAlign: 'center' },
    historyDate_detail: { color: 'white', fontSize: 18, textAlign: 'center', marginBottom: 25 },
    explanationText: { color: '#ccc', fontSize: 15, fontStyle: 'italic', marginTop: 10, lineHeight: 20 },
});
