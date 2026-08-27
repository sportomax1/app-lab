const targets = {
  dev: 'https://app-lab-git-dev-kevins-projects-3ccf05a5.vercel.app/',
  test: 'https://app-lab-git-test-kevins-projects-3ccf05a5.vercel.app/',
  prod: 'https://app-lab-git-prod-kevins-projects-3ccf05a5.vercel.app/',
  sandbox: 'https://app-lab-git-sandbox-kevins-projects-3ccf05a5.vercel.app/'
};

export default async function handler(req, res) {
  const branch = String(req.query.branch || '').toLowerCase();
  const target = targets[branch];

  if (!target) {
    return res.status(404).send('Unknown branch');
  }

  try {
    const response = await fetch(target, { redirect: 'follow' });
    const body = await response.text();

    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.send(body);
  } catch (error) {
    return res.status(502).send('Unable to load branch deployment');
  }
}
