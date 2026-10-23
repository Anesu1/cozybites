// Colour tokens defined in app/framer.css (light and dark values live there).
export const T = {
  ink: "var(--token-f989fe63-5349-464e-bd89-a43fd2a03224)",
  inkFixed: "var(--token-2a3aac05-455c-40b7-b073-c9ffbf203fe2)",
  white: "var(--token-5bf97bf8-b3ca-4e9a-92dc-df0be83ea87b)",
  surface: "var(--token-b82a9e10-48e2-4683-9bea-037309294cd5)",
  surfaceMuted: "var(--token-b5ffc4fc-b3b7-45d9-a414-f0814a687760)",
  border: "var(--token-91276900-a043-4287-9c6f-0395c205f465)",
  accent: "var(--token-192396b5-5763-4188-8ce1-8577647c4047)",
  placeholder: "var(--token-18c05b0d-aacd-4993-8322-3756d8a0eb00)",
  // Cozy Bites brand pink (defined in app/globals.css)
  pink: "var(--cb-pink)",
  onPink: "#fff",
} as const;

// Framer breakpoint visibility classes (see the top of app/framer.css).
export const HIDE = {
  desktop: "hidden-72rtr7", // >= 1470px
  tablet: "hidden-1sn7xjd", // 810px – 1469.98px
  phone: "hidden-1gj7id7", // < 810px
} as const;
