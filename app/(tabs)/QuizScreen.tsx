import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Question bank avec thème
const quizQuestionsBank = [
  {
    theme: "Green IT",
    question: "Quel est le principal objectif du Green IT ?",
    options: [
      "Augmenter la consommation d'énergie des équipements informatiques",
      "Réduire l'impact environnemental des technologies de l'information et de la communication",
      "Développer de nouveaux logiciels pour les jeux vidéo",
    ],
    answerIndex: 1,
  },
  {
    theme: "Politique numérique",
    question: "Quand le manifeste de Green IT Global a-t-il été publié ?",
    options: ["14 juin 2017", "4 avril 2017", "1 janvier 2018"],
    answerIndex: 0,
  },
  {
    theme: "Green IT",
    question: "Qu'est-ce que l'obsolescence programmée ?",
    options: [
      "La conception d'un produit pour qu'il ait une durée de vie illimitée",
      "La réduction volontaire de la durée de vie d'un produit pour augmenter son taux de remplacement",
      "L'amélioration constante des performances d'un produit",
    ],
    answerIndex: 1,
  },
  {
    theme: "Recyclage",
    question:
      "Pourquoi est-il important de recycler les équipements électroniques ?",
    options: [
      "Pour polluer davantage l'environnement",
      "Pour récupérer des matériaux rares et éviter la dispersion de substances toxiques",
      "Pour encourager l'achat de nouveaux appareils uniquement",
    ],
    answerIndex: 1,
  },
  {
    theme: "Développement durable",
    question:
      "Quel est l'un des piliers du développement durable appliqué au numérique ?",
    options: [
      "L'augmentation des émissions de gaz à effet de serre",
      "La consommation illimitée de ressources",
      "L'efficacité énergétique et la sobriété numérique",
    ],
    answerIndex: 2,
  },
  // Ajoute d'autres questions avec des thèmes pertinents
];

export default function QuizScreen() {
  const [step, setStep] = useState<"theme" | "quiz" | "result">("theme");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [displayedQuestions, setDisplayedQuestions] = useState<
    typeof quizQuestionsBank
  >([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [themeStats, setThemeStats] = useState<
    Record<string, { total: number; correct: number }>
  >({});

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

  const handleSubmit = () => {
    if (
      selectedAnswers.length === displayedQuestions.length &&
      selectedAnswers.every((ans) => ans !== undefined)
    ) {
      setSubmitted(true);

      const stats: Record<string, { total: number; correct: number }> = {};

      displayedQuestions.forEach((q, i) => {
        const theme = q.theme;
        const correct = q.answerIndex === selectedAnswers[i];
        if (!stats[theme]) stats[theme] = { total: 0, correct: 0 };
        stats[theme].total += 1;
        if (correct) stats[theme].correct += 1;
      });

      setThemeStats(stats);
      setStep("result");
    } else {
      alert("Veuillez répondre à toutes les questions.");
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

  // --- NOUVELLE FONCTION POUR LE RETOUR ---
  const handleBackToThemes = () => {
    setStep("theme");
    // On réinitialise les questions et réponses pour forcer un rechargement au prochain quiz
    setDisplayedQuestions([]);
    setSelectedAnswers([]);
    setSubmitted(false);
    // On conserve `selectedThemes` pour que l'utilisateur n'ait pas à tout resélectionner
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2A3836" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          step === "quiz" ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
              title="Chargement de nouvelles questions..."
              titleColor="#fff"
            />
          ) : undefined
        }
      >
        {step === "theme" && (
          <View style={styles.content}>
            <Text style={styles.title}>Choisissez un ou plusieurs thèmes</Text>
            {[
              "Green IT",
              "Recyclage",
              "Politique numérique",
              "Développement durable",
            ].map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.option,
                  selectedThemes.includes(theme) && styles.selectedOption,
                ]}
                onPress={() => handleThemeSelect(theme)}
              >
                <Text style={styles.optionText}>{theme}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.submitButton} onPress={startQuiz}>
              <Text style={styles.submitText}>Commencer le quiz</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === "quiz" && (
          <View style={styles.content}>
            {/* --- BOUTON DE RETOUR AJOUTÉ --- */}
            {!submitted && (
               <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackToThemes}
              >
                <Text style={styles.backButtonText}>‹ Retour aux thèmes</Text>
              </TouchableOpacity>
            )}
           
            {displayedQuestions.map((q, qIndex) => (
              <View key={qIndex} style={styles.questionBlock}>
                <Text style={styles.question}>{q.question}</Text>
                {q.options.map((option, oIndex) => {
                  const isSelected = selectedAnswers[qIndex] === oIndex;
                  const isCorrect = submitted && oIndex === q.answerIndex;
                  const isWrong =
                    submitted && isSelected && oIndex !== q.answerIndex;

                  return (
                    <TouchableOpacity
                      key={oIndex}
                      style={[
                        styles.option,
                        isSelected && styles.selectedOption,
                        isCorrect && styles.correctOption,
                        isWrong && styles.wrongOption,
                      ]}
                      onPress={() => selectOption(qIndex, oIndex)}
                      disabled={submitted}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {!submitted && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>Soumettre</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {step === "result" && (
          <View style={styles.content}>
            <Text style={styles.title}>Résultats du quiz</Text>
            <Text style={styles.resultText}>
              Score :{" "}
              {
                selectedAnswers.filter(
                  (a, i) => a === displayedQuestions[i]?.answerIndex
                ).length
              }{" "}
              / {displayedQuestions.length}
            </Text>

            {Object.keys(themeStats).length > 1 &&
              (() => {
                const { best, worst } = getBestAndWorstThemes();
                return (
                  <>
                    <Text style={styles.resultText}>
                      ✅ Thème le plus réussi : {best[0]} ({best[1].correct} /{" "}
                      {best[1].total})
                    </Text>
                    <Text style={styles.resultText}>
                      ❌ Thème le moins réussi : {worst[0]} ({worst[1].correct} /{" "}
                      {worst[1].total})
                    </Text>
                  </>
                );
              })()}
            
            {/* --- BOUTON DE RETOUR AJOUTÉ --- */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setStep("quiz")}
            >
              <Text style={styles.secondaryButtonText}>Revoir le quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setStep("theme");
                setSelectedThemes([]);
                setDisplayedQuestions([]);
              }}
            >
              <Text style={styles.submitText}>Rejouer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  questionBlock: {
    marginBottom: 24,
  },
  question: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  option: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#999",
  },
  correctOption: {
    backgroundColor: "green",
  },
  wrongOption: {
    backgroundColor: "crimson",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "gold",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2A3836"
  },
  resultText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 28, // Améliore la lisibilité
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    marginTop: 20,
    backgroundColor: '#555', // Couleur plus sobre pour une action secondaire
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});