export const createSnowAnimation = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const snowflakes = Array.from({ length: 100 }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 1 + Math.random() * 3,
    dx: -1 + Math.random() * 2,
    dy: 1 + Math.random() * 3,
  }));

  const update = () => {
    ctx.clearRect(0, 0, width, height);

    snowflakes.forEach((s) => {
      s.x += s.dx;
      s.y += s.dy;

      if (s.y > height) s.y = -5;
      if (s.x > width) s.x = 0;
      if (s.x < 0) s.x = width;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });

    requestAnimationFrame(update);
  };

  update();

  return () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
};
