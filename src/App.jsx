import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, RoundedBox, Text } from '@react-three/drei';
import { FileText, RefreshCw, Terminal, CheckCircle2, Clock } from 'lucide-react';

// Komponen Karakter Agen 3D
function AgentCharacter({ position, color, name, role, status, bubble, onSelect }) {
  const groupRef = useRef();

  // Animasi mengangguk/mengetik saat status 'working'
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (status === 'working') {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 6)) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 8) * 0.05;
    } else {
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.02;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group position={position}>
      {/* Meja Kerja & Monitor */}
      <group position={[0, 0, 0.8]}>
        <RoundedBox args={[1.6, 0.1, 0.8]} position={[0, 0.7, 0]} radius={0.02}>
          <meshStandardMaterial color="#d4a373" />
        </RoundedBox>
        {/* Kaki Meja */}
        <mesh position={[-0.7, 0.35, 0]}>
          <boxGeometry args={[0.08, 0.7, 0.7]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.7, 0.35, 0]}>
          <boxGeometry args={[0.08, 0.7, 0.7]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Monitor */}
        <mesh position={[0, 1.05, 0.1]}>
          <boxGeometry args={[0.7, 0.45, 0.05]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 1.05, 0.07]}>
          <planeGeometry args={[0.64, 0.39]} />
          <meshStandardMaterial
            color={status === 'working' ? '#38bdf8' : '#1e293b'}
            emissive={status === 'working' ? '#0284c7' : '#000000'}
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Avatar Karakter */}
      <group ref={groupRef} onClick={onSelect} style={{ cursor: 'pointer' }}>
        {/* Badan */}
        <RoundedBox args={[0.55, 0.7, 0.4]} position={[0, 0.75, 0]} radius={0.1}>
          <meshStandardMaterial color={color} />
        </RoundedBox>
        {/* Kepala */}
        <RoundedBox args={[0.45, 0.45, 0.45]} position={[0, 1.38, 0]} radius={0.12}>
          <meshStandardMaterial color="#fed7aa" />
        </RoundedBox>
        {/* Kursi */}
        <RoundedBox args={[0.55, 0.1, 0.55]} position={[0, 0.4, -0.05]} radius={0.03}>
          <meshStandardMaterial color="#1e293b" />
        </RoundedBox>
      </group>

      {/* Bubble Laporan & Label Nama */}
      <Html position={[0, 2.1, 0]} center distanceFactor={10}>
        <div
          onClick={onSelect}
          className="cursor-pointer select-none w-48 bg-slate-900/95 border border-slate-700 text-white p-2.5 rounded-xl shadow-xl backdrop-blur-sm transition hover:scale-105"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  status === 'working'
                    ? 'bg-amber-400 animate-ping'
                    : status === 'done'
                    ? 'bg-emerald-400'
                    : 'bg-slate-400'
                }`}
              />
              {name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {role}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">{bubble}</p>
        </div>
      </Html>
    </group>
  );
}

// Komponen Ruangan Kantor Isometrik
function OfficeRoom({ statusData, onSelectAgent }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 12, 8]} intensity={1.2} castShadow />

      {/* Lantai Kantor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Dinding Belakang & Kiri */}
      <mesh position={[0, 1.75, -4]}>
        <boxGeometry args={[10, 3.5, 0.2]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[-5, 1.75, 0]}>
        <boxGeometry args={[0.2, 3.5, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Papan Misi di Dinding Belakang */}
      <group position={[0, 2, -3.85]}>
        <mesh>
          <boxGeometry args={[4.2, 1.5, 0.08]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.45, 0.06]} fontSize={0.2} color="#38bdf8" anchorX="center">
          MISSION BOARD - KANTOR AI
        </Text>
        <Text
          position={[0, -0.05, 0.06]}
          fontSize={0.14}
          color="#f8fafc"
          maxWidth={3.8}
          anchorX="center"
        >
          {statusData.mission}
        </Text>
      </group>

      {/* Sekat Kubikel */}
      <mesh position={[-1.6, 0.75, 0.2]}>
        <boxGeometry args={[0.1, 1.5, 2.5]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[1.6, 0.75, 0.2]}>
        <boxGeometry args={[0.1, 1.5, 2.5]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* 3 Karyawan AI */}
      <AgentCharacter
        position={[-3.2, 0, 0]}
        color="#2563eb"
        name="rama"
        role="Riset"
        status={statusData.agents.rama.status}
        bubble={statusData.agents.rama.bubble}
        onSelect={() => onSelectAgent('rama')}
      />
      <AgentCharacter
        position={[0, 0, 0]}
        color="#db2777"
        name="amira"
        role="Naskah"
        status={statusData.agents.amira.status}
        bubble={statusData.agents.amira.bubble}
        onSelect={() => onSelectAgent('amira')}
      />
      <AgentCharacter
        position={[3.2, 0, 0]}
        color="#059669"
        name="atha"
        role="Jadwal"
        status={statusData.agents.atha.status}
        bubble={statusData.agents.atha.bubble}
        onSelect={() => onSelectAgent('atha')}
      />

      <OrbitControls
        enablePan={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
      />
    </>
  );
}

export default function App() {
  const [statusData, setStatusData] = useState({
    mission: 'Menunggu perintah dari terminal Antigravity CLI...',
    agents: {
      rama: { status: 'idle', bubble: 'Siap melakukan riset!' },
      amira: { status: 'idle', bubble: 'Siap menulis naskah!' },
      atha: { status: 'idle', bubble: 'Siap mengatur jadwal!' },
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  // Polling status.json setiap 3 detik
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/output/status.json?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          setStatusData(data);
        }
      } catch (err) {
        // Abaikan jika file belum siap
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // Buka isi file markdown hasil kerja agen
  const openAgentOutput = async (agentKey) => {
    const fileMap = {
      rama: { title: 'Hasil Riset (riset.md)', path: '/output/riset.md' },
      amira: { title: 'Draft Naskah (naskah.md)', path: '/output/naskah.md' },
      atha: { title: 'Jadwal Posting (jadwal.md)', path: '/output/jadwal.md' },
    };
    const target = fileMap[agentKey];
    setSelectedFile(target.title);
    try {
      const res = await fetch(`${target.path}?t=${Date.now()}`);
      if (res.ok) {
        setFileContent(await res.text());
      } else {
        setFileContent('Belum ada hasil kerja. Jalankan agen di terminal terlebih dahulu.');
      }
    } catch {
      setFileContent('Gagal memuat file output.');
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-950 flex flex-col font-sans overflow-hidden">
      {/* Header Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <h1 className="font-bold tracking-wide text-sm md:text-base">
            KANTOR AI 3D <span className="text-slate-400 font-normal">| Multi-Agent Workspace</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <button
            onClick={() => openAgentOutput('rama')}
            className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/40 transition"
          >
            Riset (rama)
          </button>
          <button
            onClick={() => openAgentOutput('amira')}
            className="px-3 py-1.5 rounded-lg bg-pink-600/20 border border-pink-500/40 hover:bg-pink-600/40 transition"
          >
            Naskah (amira)
          </button>
          <button
            onClick={() => openAgentOutput('atha')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/40 transition"
          >
            Jadwal (atha)
          </button>
        </div>
      </header>

      {/* Area Utama 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas shadows camera={{ position: [0, 6.5, 8.5], fov: 45 }}>
          <color attach="background" args={['#0f172a']} />
          <OfficeRoom statusData={statusData} onSelectAgent={openAgentOutput} />
        </Canvas>

        {/* Petunjuk Singkat di Pojok Kiri Bawah */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 text-slate-300 p-3 rounded-xl text-xs max-w-xs backdrop-blur">
          <div className="flex items-center gap-1.5 font-semibold text-white mb-1">
            <Terminal className="w-4 h-4 text-sky-400" /> Kontrol Codespaces
          </div>
          <p>Klik pada avatar <b>rama</b>, <b>amira</b>, atau <b>atha</b> untuk melihat dokumen hasil kerja mereka secara real-time.</p>
        </div>

        {/* Panel Drawer Pembaca File Hasil Kerja Agen */}
        {selectedFile && (
          <div className="absolute top-4 right-4 bottom-4 w-full max-w-md bg-slate-900/95 border border-slate-700 rounded-2xl shadow-2xl flex flex-col text-white backdrop-blur-md z-20">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <FileText className="w-4 h-4 text-sky-400" />
                {selectedFile}
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Tutup
              </button>
            </div>
            <pre className="p-4 text-xs text-slate-200 whitespace-pre-wrap overflow-y-auto flex-1 font-mono leading-relaxed">
              {fileContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}