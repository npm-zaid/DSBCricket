import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Star, Plus, Eye } from 'lucide-react';
import gsap from 'gsap';

const players = [
  { name: 'Arjun Sharma', role: 'Batsman', value: 2450, change: 12.5, trending: 'up', avatar: '🏏' },
  { name: 'Vikram Singh', role: 'All-Rounder', value: 3200, change: -2.3, trending: 'down', avatar: '⭐' },
  { name: 'Rohit Patel', role: 'Bowler', value: 1890, change: 8.7, trending: 'up', avatar: '🎯' },
];

const PlayerWatchlist = () => {
  const [watchedPlayers, setWatchedPlayers] = useState<string[]>(['Arjun Sharma']);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  const toggleWatch = (name: string) => {
    setWatchedPlayers(prev => 
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    );
  };

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (row) {
        gsap.fromTo(row, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, delay: i * 0.1 });
      }
    });
  }, []);

  return (
    <div className="w-full glass rounded-2xl overflow-hidden border border-border/50">
      <div className="px-6 py-5 border-b border-border/50 bg-card/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-boundary/10">
            <Eye className="w-5 h-5 text-boundary" />
          </div>
          <div>
            <h4 className="font-display font-bold">Rising Stars</h4>
            <p className="text-xs text-muted-foreground">Track player value</p>
          </div>
        </div>
        <span className="text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50">Live</span>
      </div>

      <div className="divide-y divide-border/30">
        {players.map((player, index) => (
          <div 
            key={player.name}
            ref={(el) => { if (el) rowsRef.current[index] = el; }}
            className="group px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">{player.avatar}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{player.name}</span>
                  {watchedPlayers.includes(player.name) && <Star className="w-4 h-4 text-boundary fill-boundary" />}
                </div>
                <span className="text-sm text-muted-foreground">{player.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-display font-bold">{player.value.toLocaleString()}</div>
                <div className={`flex items-center justify-end gap-1 text-sm ${player.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {player.trending === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{player.change > 0 ? '+' : ''}{player.change}%</span>
                </div>
              </div>
              <button onClick={() => toggleWatch(player.name)} className={`p-2.5 rounded-xl transition-all ${watchedPlayers.includes(player.name) ? 'bg-boundary/20 text-boundary' : 'bg-muted/50 text-muted-foreground hover:text-foreground'}`}>
                {watchedPlayers.includes(player.name) ? <Star className="w-5 h-5 fill-current" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-border/50 bg-card/30">
        <button className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-boundary hover:text-boundary transition-all text-sm font-medium text-muted-foreground">
          View All Players →
        </button>
      </div>
    </div>
  );
};

export default PlayerWatchlist;
