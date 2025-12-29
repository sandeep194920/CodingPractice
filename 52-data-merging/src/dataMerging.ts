const sessions = [
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["dumbbell"] },
  { user: 1, duration: 10, equipment: ["barbell"] },
  { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
  { user: 7, duration: 200, equipment: ["bike"] },
  { user: 2, duration: 200, equipment: ["treadmill"] },
  { user: 2, duration: 200, equipment: ["bike"] },
];

type Session = (typeof sessions)[number];

export function mergeData(sessions: Session[]): Session[] {
  const sessionsMap = new Map<number, Session>(); // stores the session against session.user

  sessions.forEach((session) => {
    const storedUser = sessionsMap.get(session.user);
    if (storedUser != null) {
      storedUser.duration += session.duration;
      storedUser.equipment = [
        ...new Set(
          [...storedUser.equipment, ...session.equipment].sort((a, b) =>
            a.localeCompare(b)
          )
        ),
      ];
    } else {
      // we need to add to sessionsMap. Make sure you are cloning the data properly before adding it

      const { user, duration, equipment } = session;

      // const sessionClone :Session= {
      //   user: session.user,
      //   duration: session.duration,
      //   equipment: [...session.equipment]
      // }

      sessionsMap.set(user, {
        user,
        duration,
        equipment: [...equipment],
      });
    }
  });

  return [...sessionsMap.values()];
}

// We need to combine the data by user and also shouldn't have duplicates in equipment. We should make sure the order of users are maintained

console.log(mergeData(sessions));
