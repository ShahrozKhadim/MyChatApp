// Home screen related types
export type QuickStat = {
  id: string;
  title: string;
  value: number;
  icon: string;
  color: string;
};

export type QuickAction = {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
};
