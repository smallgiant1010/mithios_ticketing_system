export default function Resources() {
  const gdd = "https://docs.google.com/document/d/1ypRvxxD99ncdw1itTcYZYNupHP7tMYiMck-LIQHDni4/edit?tab=t.jsbth0an85e8";
  const lore = "https://docs.google.com/document/d/10ff7HvRVg5SO6sBKXUgbg-iImTy-GL4jCkuoKTA4riA/edit?tab=t.6sgg714b60sz#heading=h.skd13q9pu1a6";
  const figma = "https://www.figma.com/board/YIx5M2cXMHewxXpGIitcnM/Map-Blueprints?node-id=0-1&t=HT5aFQ1KIxCc7okK-1";

  return (<div>
    <h1>Mithios Game Design Document</h1>
    <a href={gdd}>Project Mithios</a>
    <h1>Isseddra Lore</h1>
    <a href={lore}>IPAD</a>
    <h1>Map Ideas</h1>
    <a href={figma}>Figma</a>
    <br />
    <i>*Message A Manager If You Don't Have Access To One Of The Resources</i>
  </div>)
}
