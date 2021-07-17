import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
	return (
		<Box>
			<img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
		</Box>
	)
}

export default function Home() {
	const githubUser = "GKyomen"
	const amigos = [
		"mateusnishimura",
		"akamarc0s",
		"boolivias",
		"Pedrohme",
		"MathVolps",
		"GuiMilani"
	]

	return (
		<>
		<AlurakutMenu />
		<MainGrid>
			<div className="profileArea" style={{ gridArea: "profileArea" }}>
				<ProfileSidebar githubUser={githubUser} />
			</div>
			<div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
				<Box>
					<h1 className="title">
						Bem-vindo (a)
					</h1>

					<OrkutNostalgicIconSet />
				</Box>
			</div>
			<div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Amigos ({amigos.length})
					</h2>

					<ul>
						{amigos.map((amigo) => {
							return (
								<li>
									<a href={`/users/${amigo}`} key={amigo}>
										<img src={`https://github.com/${amigo}.png`}/>
										<span>{amigo}</span>
									</a>
								</li>
							)
						})}
					</ul>
				</ProfileRelationsBoxWrapper>
			</div>
    	</MainGrid>
		</>
  	)
}
