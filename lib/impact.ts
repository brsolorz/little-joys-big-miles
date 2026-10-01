export const impactExamples=[
{amount:25,text:"can help provide a school kit for a refugee child attending primary school in Burkina Faso.",short:"A school kit. A fresh start."},
{amount:50,text:"can help provide nutrition supplements for a malnourished refugee child in Tanzania.",short:"Nourishment when it’s needed."},
{amount:100,text:"can help a refugee in Mali access vocational and entrepreneurship training.",short:"Skills for the next chapter."},
{amount:250,text:"can help provide a durable handwashing facility serving 60 refugees in Rwanda.",short:"Everyday essentials, shared."},
{amount:500,text:"can help a refugee entrepreneur launch or expand a small business.",short:"A chance to build something."}
];
export function impactFor(amount:number){return [...impactExamples].reverse().find(x=>amount>=x.amount)??impactExamples[0]}
