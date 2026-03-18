import { redirect } from 'next/navigation';

export default function HomePage() {
	redirect('/dashboard');
}

// clienthub-crm/
//   src/
//     app/
//       layout.tsx
//       page.tsx
//       globals.css

//       dashboard/
//         layout.tsx
//         page.tsx

//         clients/
//           page.tsx

//         deals/
//           page.tsx

//         tasks/
//           page.tsx

//         users/
//           page.tsx

//         analytics/
//           page.tsx

//     components/
//       layout/
//         Sidebar.tsx
//         Header.tsx
//         DashboardLayout.tsx

//       ui/

//     features/
//       clients/
//         hooks/
//         services/
//         components/
//         types.ts

//       deals/
//       tasks/
//       users/

//     store/
//       providers.tsx
//       store.ts
//       slices/

//     lib/
//       mock-data/
//         clients.ts
//       utils/
//       constants/

//     schemas/
//     types/
