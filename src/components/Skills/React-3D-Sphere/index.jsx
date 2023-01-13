import React from 'react';

const texts = [
  'React',
  'Html',
  'CSS',
  'Bootstrap',
  'SASS',
  'Git',
  'Express',
  'Github',
  'Netlify',
  'Algorithms',
  'Redux',
  'REST',
  'Redux',
  'Redux-toolkit',
  'Tailwind Css',
  'Javascript',
  'Proplem-Solving'
];
const computePosition = (idx, random = false, size) => {
  if (random)
      idx = Math.floor(Math.random() * (texts.length + 1));
  const phi = Math.acos(-1 + (2 * idx + 1) / texts.length);
  const theta = Math.sqrt((texts.length + 1) * Math.PI) * phi;
  return {
      x: (size * Math.cos(theta) * Math.sin(phi)) / 2,
      y: (size * Math.sin(theta) * Math.sin(phi)) / 2,
      z: (size * Math.cos(phi)) / 2
  };
};
const CreateTag = (idx, text, size) => {

  const tagRef = React.useRef(null);
  return Object.assign({ idx: idx, text: text, opacity: 0, filter: 'alpha(opacity=0)', transform: 'translate3d(-50%, -50%, 0) scale(1)', tagRef: tagRef }, computePosition(idx, false, size));
};
const createInitialState = (size) => {
  return texts.map((text, i) => {
      return CreateTag(i, text, size);
  });
};
const { radius, maxSpeed, initSpeed, direction } = {
  radius: 300,
  maxSpeed: 20,
  initSpeed: 40,
  direction: 135
};
const size = 1.5 * radius;
const depth = 2 * radius;
const Words = React.memo(() => {
  const tagCloudRef = React.useRef(null);
  const [items, setItems] = React.useState(createInitialState(size));
  const mouseX0 = React.useRef(initSpeed * Math.sin(direction * (Math.PI / 180))); // prettier-ignore
  const mouseY0 = React.useRef(-initSpeed * Math.cos(direction * (Math.PI / 180))); // prettier-ignore
  const mouseX = React.useRef(mouseX0.current);
  const mouseY = React.useRef(mouseY0.current);
  const next = React.useCallback(() => {
      const a = -(Math.min(Math.max(-mouseY.current, -size), size) / radius) * maxSpeed; // prettier-ignore
      const b = (Math.min(Math.max(-mouseX.current, -size), size) / radius) * maxSpeed; // prettier-ignore
      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01)
          return; // pause
      // calculate offset
      const l = Math.PI / 180;
      const sc = [
          Math.sin(a * l),
          Math.cos(a * l),
          Math.sin(b * l),
          Math.cos(b * l)
      ];
      setItems((prev) => {
          const items = prev.map(item => {
              var _a;
              const rx1 = item.x;
              const ry1 = item.y * sc[1] + item.z * -sc[0];
              const rz1 = item.y * sc[0] + item.z * sc[1];
              const rx2 = rx1 * sc[3] + rz1 * sc[2];
              const ry2 = ry1;
              const rz2 = rz1 * sc[3] - rx1 * sc[2];
              const per = (2 * depth) / (2 * depth + rz2);
              item.scale = Number(per.toFixed(3));
              let alpha = per * per - 0.25;
              alpha = Number((alpha > 1 ? 1 : alpha).toFixed(3));
              if ((_a = item === null || item === void 0 ? void 0 : item.tagRef) === null || _a === void 0 ? void 0 : _a.current) {
                  const left = (item.x - item.tagRef.current.offsetWidth / 2).toFixed(2);
                  const top = (item.y - item.tagRef.current.offsetHeight / 2).toFixed(2);
                  return Object.assign(Object.assign({}, item), { x: rx2, y: ry2, z: rz2, opacity: alpha, transform: `translate3d(${left}px, ${top}px, 0) scale(${item.scale})`, filter: `alpha(opacity=${100 * alpha})` });
              }
          });
          return items;
      });
  }, []);
  React.useEffect(() => {
      if (tagCloudRef === null || tagCloudRef === void 0 ? void 0 : tagCloudRef.current) {
          const interval = setInterval(next, 100);
          return () => clearInterval(interval);
      }
  }, [tagCloudRef]);
  return (React.createElement("div", { ref: tagCloudRef, className: 'tag-cloud', onMouseMove: ev => {
          if (tagCloudRef === null || tagCloudRef === void 0 ? void 0 : tagCloudRef.current) {
              const rect = tagCloudRef.current.getBoundingClientRect();
              mouseX.current = (ev.clientX - (rect.left + rect.width / 2)) / 5;
              mouseY.current = (ev.clientY - (rect.top + rect.height / 2)) / 5;
          }
      }, style: {
          position: 'relative',
          width: `${2 * radius}px`,
          height: `${2 * radius}px`
      } }, items.map(item => {
      return (React.createElement("span", { key: item.idx, className: 'tag-cloud__item', ref: item.tagRef, style: {
              filter: item.filter,
              opacity: item.opacity,
              transform: item.transform
          } }, item.text));
  })));
});

export default Words;