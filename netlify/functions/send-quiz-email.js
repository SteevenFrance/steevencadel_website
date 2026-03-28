const https = require("https");

// ---- Email templates per profile ----
const templates = {
  "Le Submergé": {
    subject: "Votre profil : Le Submergé — 3 actions pour reprendre le contrôle",
    body: (score) => `
      <p>Bonjour,</p>
      <p>Merci d'avoir pris le temps de faire le test <strong>« Quel est votre niveau d'organisation ? »</strong>.</p>
      <p>Votre score : <strong>${score}/28</strong><br>Votre profil : <strong>Le Submergé</strong></p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Ce que ça signifie</h2>
      <p>Votre organisation repose essentiellement sur votre mémoire et sur l'urgence du moment. Les tâches s'accumulent, la charge mentale est élevée, et vous avez l'impression de courir sans jamais avancer sur l'essentiel.</p>
      <p>Pas de jugement — c'est le point de départ de beaucoup de gens (moi y compris, il y a quelques années).</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">3 actions concrètes à mettre en place cette semaine</h2>

      <h3 style="color:#C9A84C;">1. La capture unique</h3>
      <p>Choisissez <strong>un seul endroit</strong> pour noter toutes vos tâches. Un carnet, une appli, peu importe — mais un seul. Plus de Post-its, plus de notes sur le téléphone ET sur le frigo. Tout va au même endroit.</p>

      <h3 style="color:#C9A84C;">2. La règle des 3</h3>
      <p>Chaque matin, identifiez <strong>3 tâches maximum</strong> qui sont vraiment importantes pour la journée. Pas 10, pas 15. Trois. Commencez par celles-là avant de répondre aux emails ou de faire les petites urgences.</p>

      <h3 style="color:#C9A84C;">3. Le vidage hebdomadaire</h3>
      <p>Le dimanche soir ou le lundi matin, prenez <strong>15 minutes</strong> pour regarder tout ce qui traîne dans votre liste. Supprimez ce qui n'a plus de sens. Vous verrez : ça fait un bien fou.</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Pour aller plus loin</h2>
      <p>Ces 3 actions sont un bon début, mais elles ne sont que la surface. Dans <strong>Restart Mensuel</strong>, je vous explique la méthode complète que j'utilise depuis des années pour repartir de zéro chaque mois et ne garder que l'essentiel.</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="https://amzn.eu/d/0ayQhczf" style="display:inline-block;background:#C9A84C;color:#1B3A6B;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Découvrir Restart Mensuel →</a>
      </p>

      <p>À bientôt,<br><strong>Steeven Cadel</strong></p>
    `
  },

  "L'Organisé Fragile": {
    subject: "Votre profil : L'Organisé Fragile — Le chaînon manquant",
    body: (score) => `
      <p>Bonjour,</p>
      <p>Merci d'avoir pris le temps de faire le test <strong>« Quel est votre niveau d'organisation ? »</strong>.</p>
      <p>Votre score : <strong>${score}/28</strong><br>Votre profil : <strong>L'Organisé Fragile</strong></p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Ce que ça signifie</h2>
      <p>Vous n'êtes pas désorganisé — vous êtes <strong>organisé de façon instable</strong>. Vous avez des outils, des méthodes, parfois même de bonnes habitudes. Mais ça ne tient pas dans la durée : après quelques semaines, le système s'effondre et vous repartez de zéro.</p>
      <p>Le problème n'est pas votre discipline. C'est qu'il vous manque un <strong>mécanisme de remise à zéro intentionnel</strong>.</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">3 actions concrètes à mettre en place cette semaine</h2>

      <h3 style="color:#C9A84C;">1. Arrêtez de multiplier les outils</h3>
      <p>Un seul outil de gestion de tâches. Un seul calendrier. La fragmentation est votre ennemi principal. Choisissez votre combo et <strong>supprimez les doublons</strong> (oui, même ce carnet Moleskine que vous adorez).</p>

      <h3 style="color:#C9A84C;">2. Instaurez un « Restart » mensuel</h3>
      <p>Le 1er de chaque mois, prenez <strong>30 minutes</strong> pour faire le tri. Regardez chaque tâche de votre liste et posez-vous une seule question : <em>« Est-ce que je reconduis consciemment cette tâche ? »</em>. Tout ce qui ne passe pas le filtre, supprimez-le.</p>

      <h3 style="color:#C9A84C;">3. Créez 5 projets maximum</h3>
      <p>Regroupez vos tâches dans <strong>5 projets actifs maximum</strong> (pas 15 !). Un projet = un domaine de votre vie qui compte ce mois-ci. Les autres attendent.</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Pour aller plus loin</h2>
      <p>Le <strong>Restart Mensuel</strong> a été conçu exactement pour votre profil : des gens qui ont les bonnes intentions mais pas le bon cadre. Le livre vous donne le système complet — la structure mensuelle, hebdomadaire et quotidienne qui tient dans le temps.</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="https://amzn.eu/d/0ayQhczf" style="display:inline-block;background:#C9A84C;color:#1B3A6B;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Découvrir Restart Mensuel →</a>
      </p>

      <p>À bientôt,<br><strong>Steeven Cadel</strong></p>
    `
  },

  "Le Méthodique": {
    subject: "Votre profil : Le Méthodique — Passez au niveau supérieur",
    body: (score) => `
      <p>Bonjour,</p>
      <p>Merci d'avoir pris le temps de faire le test <strong>« Quel est votre niveau d'organisation ? »</strong>.</p>
      <p>Votre score : <strong>${score}/28</strong><br>Votre profil : <strong>Le Méthodique</strong></p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Ce que ça signifie</h2>
      <p>Vous êtes déjà bien organisé. Vous avez un système, des habitudes, et vous avancez sur vos priorités. Mais il reste des <strong>zones de friction</strong> : des tâches qui traînent depuis trop longtemps, des périodes où tout dérape, ou ce sentiment que vous pourriez faire mieux.</p>
      <p>Le bon côté : vous n'avez pas besoin de tout changer. Juste d'<strong>affiner votre système</strong>.</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">3 actions concrètes pour passer au niveau supérieur</h2>

      <h3 style="color:#C9A84C;">1. Le bilan de fin de mois</h3>
      <p>Ajoutez un rituel de 20 minutes en fin de mois : qu'est-ce qui a fonctionné ? Qu'est-ce qui a bloqué ? Quels projets méritent de continuer ? Ce <strong>moment de recul</strong> fait la différence entre « bien organisé » et « intentionnellement organisé ».</p>

      <h3 style="color:#C9A84C;">2. La migration consciente</h3>
      <p>Les tâches qui traînent depuis plus de 2 semaines sans avancer méritent une décision : <strong>faire, déléguer, planifier à une date précise, ou supprimer</strong>. Ne laissez plus rien dans les limbes.</p>

      <h3 style="color:#C9A84C;">3. Séparez l'urgent de l'important</h3>
      <p>Chaque matin, avant de consulter vos emails, identifiez <strong>la tâche la plus importante</strong> (pas la plus urgente). Bloquez 90 minutes dans votre calendrier pour la traiter. Les urgences attendront.</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Pour aller plus loin</h2>
      <p>Le livre <strong>Restart Mensuel</strong> va plus loin que ces conseils : il décrit le système complet — le rythme mensuel, hebdomadaire et quotidien, la personnalisation par profil, et comment maintenir votre système sur le long terme sans effort.</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="https://amzn.eu/d/0ayQhczf" style="display:inline-block;background:#C9A84C;color:#1B3A6B;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Découvrir Restart Mensuel →</a>
      </p>

      <p>À bientôt,<br><strong>Steeven Cadel</strong></p>
    `
  },

  "Le Maître du Restart": {
    subject: "Votre profil : Le Maître du Restart — Vous avez le contrôle",
    body: (score) => `
      <p>Bonjour,</p>
      <p>Merci d'avoir pris le temps de faire le test <strong>« Quel est votre niveau d'organisation ? »</strong>.</p>
      <p>Votre score : <strong>${score}/28</strong><br>Votre profil : <strong>Le Maître du Restart</strong></p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Ce que ça signifie</h2>
      <p>Bravo — vous faites partie des rares personnes qui ont un <strong>vrai système d'organisation</strong> en place. Vous savez ce qui compte, vous faites le tri régulièrement, et vous ne vous laissez pas submerger par le bruit.</p>
      <p>Ce n'est pas un hasard : c'est le résultat d'habitudes construites consciemment.</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">3 idées pour aller encore plus loin</h2>

      <h3 style="color:#C9A84C;">1. Partagez votre système</h3>
      <p>Vous avez quelque chose de précieux : un système qui fonctionne. <strong>Partagez-le</strong> avec votre équipe, vos proches, vos collègues. L'organisation est contagieuse — dans le bon sens.</p>

      <h3 style="color:#C9A84C;">2. Passez de l'organisation à l'intentionnalité</h3>
      <p>Vous gérez bien vos tâches. Mais gérez-vous bien votre <strong>direction</strong> ? Une fois par trimestre, prenez du recul : est-ce que vos projets sont alignés avec ce qui compte vraiment pour vous à long terme ?</p>

      <h3 style="color:#C9A84C;">3. Automatisez ce qui peut l'être</h3>
      <p>À votre niveau, les gains ne sont plus dans la méthode mais dans l'<strong>élimination des frictions</strong>. Quelles tâches récurrentes pouvez-vous automatiser, déléguer, ou simplifier ?</p>

      <h2 style="color:#1B3A6B;margin-top:32px;">Restart Mensuel : une lecture complémentaire</h2>
      <p>Même avec un bon système, il est toujours utile de <strong>confronter ses pratiques</strong> à une autre approche. Dans Restart Mensuel, je partage mon année complète avec la méthode, mes erreurs, et les ajustements qui ont fait la différence. C'est peut-être l'idée qui vous manque.</p>
      <p style="text-align:center;margin:32px 0;">
        <a href="https://amzn.eu/d/0ayQhczf" style="display:inline-block;background:#C9A84C;color:#1B3A6B;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Découvrir Restart Mensuel →</a>
      </p>

      <p>À bientôt,<br><strong>Steeven Cadel</strong></p>
    `
  }
};

// ---- HTML wrapper ----
function wrapEmail(content) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;margin-top:24px;margin-bottom:24px;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <!-- Header -->
    <div style="background:#1B3A6B;padding:32px 40px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 4px;">Restart <span style="color:#C9A84C;">Mensuel</span></h1>
      <p style="color:rgba(255,255,255,.6);font-size:13px;margin:0;">Votre profil d'organisation personnalisé</p>
    </div>
    <!-- Body -->
    <div style="padding:36px 40px;color:#333;font-size:15px;line-height:1.7;">
      ${content}
    </div>
    <!-- Footer -->
    <div style="background:#f5f7fa;padding:24px 40px;text-align:center;font-size:12px;color:#999;">
      <p style="margin:0;">Steeven Cadel — Coach d'équipe & Médiateur Professionnel</p>
      <p style="margin:4px 0 0;"><a href="https://steevencadel.fr" style="color:#C9A84C;">steevencadel.fr</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ---- Handler ----
exports.handler = async (event) => {
  // CORS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders(), body: "Method Not Allowed" };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "BREVO_API_KEY not configured" })
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { email, profil, score } = data;
  if (!email || !profil || score === undefined) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "Missing fields" }) };
  }

  const template = templates[profil];
  if (!template) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: "Unknown profile" }) };
  }

  const emailPayload = {
    sender: { name: "Steeven Cadel", email: "contact@steevencadel.fr" },
    to: [{ email }],
    subject: template.subject,
    htmlContent: wrapEmail(template.body(score)),
    tags: ["quiz-restart"]
  };

  try {
    await brevoSend(apiKey, emailPayload);
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("Brevo error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Email send failed" })
    };
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
}

function brevoSend(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: "api.brevo.com",
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        "accept": "application/json",
        "content-length": Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Brevo API ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}
