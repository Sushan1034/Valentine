import MainLayout from './components/layout/MainLayout'
import { useValentineDate } from './hooks/useValentineDate'
import RoseDay from './features/days/RoseDay'
import ProposeDay from './features/days/ProposeDay'
import ChocolateDay from './features/days/ChocolateDay'
import TeddyDay from './features/days/TeddyDay'
import PromiseDay from './features/days/PromiseDay'
import HugDay from './features/days/HugDay'
import KissDay from './features/days/KissDay'
import ValentineDay from './features/days/ValentineDay'
import LockedScreen from './features/days/LockedScreen'
import { useValentine } from './context/ValentineContext'
import Onboarding from './components/onboarding/Onboarding'
import LoveMeter from './components/layout/LoveMeter'
import { AnimatePresence } from 'framer-motion'

function App() {
    const { currentDay, unlockedDay, setCurrentDay } = useValentineDate();
    const { isFirstVisit, userData } = useValentine();

    const renderDayContent = () => {
        if (currentDay > unlockedDay) {
            return <LockedScreen dayId={currentDay} />;
        }

        switch (currentDay) {
            case 7: return <RoseDay />;
            case 8: return <ProposeDay />;
            case 9: return <ChocolateDay />;
            case 10: return <TeddyDay />;
            case 11: return <PromiseDay />;
            case 12: return <HugDay />;
            case 13: return <KissDay />;
            case 14: return <ValentineDay />;
            default:
                return <RoseDay />;
        }
    };

    return (
        <>
            <AnimatePresence>
                {isFirstVisit && <Onboarding />}
            </AnimatePresence>

            {!isFirstVisit && <LoveMeter />}

            <MainLayout
                activeDay={currentDay}
                onDaySelect={setCurrentDay}
                unlockedDay={unlockedDay}
            >
                {renderDayContent()}
            </MainLayout>
        </>
    )
}

export default App
