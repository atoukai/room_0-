'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  '他人に頼ることに抵抗がある',
  '一人の時間が苦にならない',
  '感情の起伏は少ない方だ',
  '何事にも慎重に取り組む性格だ',
  '計画を立てて行動することが多い',
  '突発的な行動をとることが少ない',
  '周囲の空気を読むことを大切にする',
  '他人の気持ちに敏感である',
  '物事を論理的に考える傾向がある',
  '集団よりも個人での活動を好む',
  '過去の出来事をよく思い出す',
  '自分の価値観を大事にしている',
  '新しい環境に適応するのに時間がかかる',
  '物事を深く掘り下げて考えることが多い',
  '批判的な意見に敏感に反応する',
  '社会的な常識に疑問を持つことがある',
  '直感よりも理屈を重視する',
  '自分の世界観を持っていると感じる',
  '他人の影響を受けにくい方だ',
  '自分の感情を言葉にするのが得意だ',
  '見た目や印象をあまり気にしない',
  '他人と深く関わることに慎重になる',
  '自分のペースを乱されるのが苦手だ',
  '感動することが少ないと感じる',
  '人前で話すことが苦手だ',
  '細かい違和感を見逃さない',
  '抽象的な話を好む',
  '一度決めたことを変えるのが難しい',
  '日常の些細なことに意味を見出す',
  '自己主張は控えめな方だ',
  '強い目的がないと動けないことがある',
  '感情をコントロールしようと努める',
  '争いを避ける傾向がある',
  '過去の自分にこだわることがある',
  '新しいことを始めるのに勇気がいる',
  '深く考えすぎて行動できないことがある',
  '自分にしか理解できない感覚がある',
  '常に何かを探し続けている気がする',
  '社会の中での自分の居場所に悩むことがある',
  '自分の考えを他人に伝えるのが難しい',
  '物事を多面的に捉える癖がある',
  '本質を見極めようとする傾向がある',
  '他人の言葉の裏を読もうとすることがある',
  '不安や孤独に敏感である',
  '内面の矛盾に気づくことがある',
  '他人との境界線を強く意識する',
  '周囲から浮いていると感じることがある',
  '人間関係の本質について考えることがある',
  '共感しすぎて疲れることがある',
  '心の奥にある感覚を誰にも言えないことがある',
  '現実よりも内面の世界を重視する傾向がある',
  '自己理解に強い関心がある',
  '社会的成功に興味が持てない',
  '感情や直感を信じる傾向がある',
  '無意味さや虚しさを感じることが多い',
  '目に見えない価値を大切にする',
  '自分の輪郭が曖昧だと感じることがある',
  '心の安全を何よりも重視する',
  'この世界に違和感を感じることがある',
  '自分に似た感覚を持つ人に強く惹かれる'
];

export default function Page() {
  const [answers, setAnswers] = useState<number[]>(Array(60).fill(2));
  const router = useRouter();

  const handleChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
    router.push('/match/self');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">room_0 - 診断</h1>
      <p className="mb-6 text-sm text-muted-foreground">以下の各質問に、あなたの感覚としてどの程度当てはまるかを選んでください。</p>
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="border p-4 rounded">
            <p className="mb-2 font-medium">設問 {index + 1}：{q}</p>
            <div className="space-x-4">
              {[0,1,2,3,4].map((val) => (
                <label key={val}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={val}
                    checked={answers[index] === val}
                    onChange={() => handleChange(index, val)}
                    className="mr-1"
                  />
                  {['まったく当てはまらない','あまり当てはまらない','どちらともいえない','やや当てはまる','非常に当てはまる'][val]}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
        >
          診断結果を送信する
        </button>
      </div>
    </div>
  );
}
